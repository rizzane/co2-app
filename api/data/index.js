var parser = require("fast-xml-parser");
var fs = require("fs");
var pg = require("pg");

const co2Path = "api/data/API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10227343.xml";
const popPath = "api/data/API_SP.POP.TOTL_DS2_en_xml_v2_10224853.xml";

const co2Data = fs.readFileSync(co2Path).toString();
const popData = fs.readFileSync(popPath).toString();

var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr",
    ignoreAttributes: false
};

const co2Json = parser.parse(co2Data, options).Root.data.record;
const popJson = parser.parse(popData, options).Root.data.record;

var i = 0;
var countryData = [];
co2Json.forEach(element => {
    let pop = popJson[i]["field"][3]["#text"];
    let json = element["field"];
    let value = (json[3]["#text"] != null) ? json[3]["#text"] : -1;
    let values = {
        "key": json[0]["attr"]["@_key"].toLowerCase(),
        "name": json[0]["#text"].toLowerCase(),
        "year": json[2]["#text"],
        "value": value,
        "population": pop
    };
    countryData[i] = values;
    i++;
});

module.exports = {
    countryData
};
