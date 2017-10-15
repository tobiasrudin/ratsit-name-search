var babyparse = require("babyparse");
var _ = require("lodash");
var moment = require("moment");

var json2csv = require("json2csv");
var fs = require("fs");

const list_of_territories = babyparse.parseFiles("").data;
var list_of_names = babyparse.parseFiles("").data;

list_of_names = _.uniqBy(list_of_names, element => element[2]);
list_of_names = _.sortBy(list_of_names, [
  function(o) {
    return o[2];
  }
]);

list_of_names.forEach(function(list_of_names_element) {
  list_of_territories.forEach(function(list_of_territories_element) {
    var zipcode = list_of_names_element[3];
    var range_low = list_of_territories_element[1];
    var range_high = list_of_territories_element[2];

    if (zipcode >= range_low && zipcode <= range_high) {
      console.log(zipcode, range_low, range_high);
      list_of_names_element.push(list_of_territories_element[0]);
    }
  });
});

console.log(list_of_names);

var csv = babyparse.unparse(list_of_names);
write_to_file(csv);

function write_to_file(csv) {
  fs.writeFile("", csv, function(err) {
    if (err) throw err;
    console.log("file saved");
  });
}
