var fs = require('fs');
var htmlparser = require("htmlparser2");

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

var file_data = "";
file_data = fs.readFileSync('sample.html', "utf-8");

console.log(parse_mail_for_partners(file_data));
