var fs = require('fs');
var htmlparser = require("htmlparser2");
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuid} = require('uuid');

function traverse(an_array) {

    var rval = "";

    an_array.forEach(function (element) {
        if (element.type == "tag" && element.name == "b") {
            var the_value = element.children[0].data;
            if (the_value == "Partner Name") {
                var first_tr = element.parent.parent.parent.parent;
                var count = 0;
                first_tr.children.forEach(function (element2) {
                    if (element2.type = "tag") {
                        if (element2.name == "tr" && count > 0) {
                            if (rval.length > 0) {
                                rval = rval + ',';
                            }

                            var data_value = element2.children[1].children[1].children[0].data;
                            data_value = data_value.trim();

                            if (data_value.length > 0) {
                                rval = rval + '"' + data_value + '"';
                            }
                        } else {
                            count++;
                        }
                    }
                });
            }
        }
        if ( element.children != null)
        {
            rval = rval + traverse(element.children);
        }
    });
    return rval;
}

function parse_mail_for_partners(the_mail_string) {

    var the_dom = null;

    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error)
            console.log(error);
        else {
            the_dom = dom;
        }
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(the_mail_string);

    return traverse(the_dom)
}

// A helper function used to read a Node.js readable stream into a string
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function main() {

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Create a unique name for the container
    const containerName = 'quickstart' + uuid();

    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container
    const createContainerResponse = await containerClient.create();
    console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);


    // Create a unique name for the blob
    const blobName = 'quickstart' + uuid() + '.txt';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log('\nUploading to Azure storage as blob:\n\t', blobName);

    // Upload data to the blob
    var file_data = "";
    file_data = fs.readFileSync('sample.html', "utf-8");
    const uploadBlobResponse = await blockBlobClient.upload(file_data, file_data.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    console.log('\nDownloaded blob content...');

    var data_body = await streamToString(downloadBlockBlobResponse.readableStreamBody)

    console.log('\t', data_body);

    console.log(parse_mail_for_partners(data_body));
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));