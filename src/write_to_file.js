let https = require("https");
let fs = require("fs");

let WriteToFile = (path, data) => {
  fs.writeFile(path, data, function(err) {
    if (err) throw err;
    console.log(path + " saved");
  });
};

module.exports = WriteToFile;
