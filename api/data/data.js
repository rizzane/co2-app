var parser = require("fast-xml-parser");
var fs = require("fs");
var pg = require("pg");

const co2Path = "api/data/API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10227343.xml";
const popPath = "api/data/API_SP.POP.TOTL_DS2_en_xml_v2_10224853.xml";

const co2Data = fs.readFileSync(co2Path).toString();
const popData = fs.readFileSync(popPath).toString();

var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", 
    ignoreAttributes : false
};

const co2Json = parser.parse(co2Data, options).Root.data.record;
const popJson = parser.parse(popData, options).Root.data.record;

module.exports = {
    co2Json,
    popJson
};
