require("dotenv").config();

/* EXTERNAL MODULES */
const https = require("https");
const param = require("jquery-param");
const X2JS = require("x2js");

let x2js = new X2JS();

const RATSIT_KEY = process.env.RATSIT_KEY;
const RATSIT_PATH = process.env.RATSIT_PATH;
const EXCLUDED_NAMES = process.env.EXCLUDED_NAMES;

const RatsitSearch = (name, area, age_to) => {
  return new Promise((resolve, reject) => {
    const search_params = {
      key: RATSIT_KEY,
      userEmail: "",
      password: "",
      who: name + " " + EXCLUDED_NAMES,
      where: area,
      phoneticSearch: false,
      isMale: true,
      isFemale: true,
      isMarried: true,
      isUnmarried: true,
      ageFrom: 16,
      ageTo: age_to
    };

    const options = {
      host: "www.ratsit.se",
      path: RATSIT_PATH + param(search_params)
    };

    const req = https.request(options, response => {
      let ratsit_response_data = "";

      response.on("data", function(chunk) {
        ratsit_response_data += chunk;
      });

      response.on("end", function() {
        resolve(x2js.xml2js(ratsit_response_data));
      });
    });

    req.on("error", err => reject(err));

    req.end();
  });
};

module.exports = RatsitSearch;
