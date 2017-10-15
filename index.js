require("dotenv").config();

/* EXTERNAL MODULES */
let babyparse = require("babyparse");
let _ = require("lodash");

/* OWN MODULES */
const FindPersonsWithLastnameInArea = require("./src/find_persons_with_lastname_in_area");

const NAMES_INPUT_FILE_NAME = process.env.NAMES_INPUT_FILE_NAME;
const AREAS_INPUT_FILE_NAME = process.env.AREAS_INPUT_FILE_NAME;
const OUTPUT_FILE_NAME = process.env.OUTPUT_FILE_NAME;
const EXCLUDED_NAMES = process.env.EXCLUDED_NAMES;

/* Parse files with names and areas */
const list_of_names = babyparse
  .parseFiles(NAMES_INPUT_FILE_NAME)
  .data.map(element => element[0]);
const list_of_areas = babyparse
  .parseFiles(AREAS_INPUT_FILE_NAME)
  .data.map(element => element[0]);

let list_of_persons = [];

async function RunSearch() {
  for (let area of list_of_areas) {
    for (let name of list_of_names) {
      const result = await FindPersonsWithLastnameInArea(name, area);
      Array.prototype.push.apply(list_of_persons, result);
    }
  }

  list_of_persons = _.uniqBy(list_of_persons, "Id");

  list_of_persons = list_of_persons.map(person => [
    person.LastName,
    person.FirstName,
    person.Address,
    person.ZipCode,
    person.City
  ]);

  WriteToFile(output_file_name, babyparse.unparse(list_of_persons));
}
RunSearch();
