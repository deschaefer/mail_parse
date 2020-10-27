# mail_parse
helper for mail parse

// this is the connection string provided for the storage connection
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
// this is the name of the container to use - created once as part of setup
const MAIL_CONTAINER_NAME = process.env.MAIL_CONTAINER_NAME;
// this is the file that contains the mail html
const MAIL_INBOUND_BLOB_NAME = process.env.MAIL_INBOUND_BLOB_NAME;
// this is name that the results will be written too
const MAIL_OUTBOUND_BLOB_NAME = process.env.MAIL_OUTBOUND_BLOB_NAME;
Supporting doc for this work can be found at -
https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs

sample output for the sample file - sample_mail_parse.html
"FLACRA", "Ability0000012749.CLM", "2020-09-11"
"FCS", "18151_Trizetto_Inst_man_", "2020-08-18"
"CSMC", "BCTRANS.DAT", "2016-09-02"
"FCC", "18495_Trizetto_Inst_man_", "2020-09-11"
"CASA-Trinity", "Ability0000015020.CLM", "2020-09-09"
"TOMKINSCMH", "Ability0000002592.CLM", "2020-09-03"
"MHAST", "WELLIGENT_I_BATCH_2654509_", "2020-08-25"
"beacon", "VOPT1329.CLM", "2020-07-14"
"FRS", "20200103.114922.0002308.NY_", "2020-01-24"
"ACBC", "Ability0000001103.CLM", "2020-08-19"
"Chenango", "MMIS0929.CLM", "2020-09-09"
"CCMHD", "EcsExport_20200911_152804_", "2020-09-11"
"TCMH", "NEIC4479 CCN.CLM", "2020-09-11"
"ADCTC", "EMEDNY030000000294.DAT", "2020-09-03"
"REACH", "17251_20200912_837_4730.clm", "2020-09-12"
