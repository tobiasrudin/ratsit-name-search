require("dotenv").config();

/* EXTERNAL MODULES */
let babyparse = require("babyparse");
let _ = require("lodash");

/* OWN MODULES */
const FindPersonsWithLastnameInArea = require("./src/find_persons_with_lastname_in_area");
const MakeSearchstringsOfPlaces = require("./src/make_searchstrings_of_places");
const WriteToFile = require("./src/write_to_file");
const SplitArrayIntoChunks = require("./src/split_array into_chunks");
const AddAlbaHeaders = require("./src/add_alba_headers");

const NAMES_INPUT_FILE_NAME = process.env.NAMES_INPUT_FILE_NAME;
const AREAS_INPUT_FILE_NAME = process.env.AREAS_INPUT_FILE_NAME;
const OUTPUT_FILE_NAME = process.env.OUTPUT_FILE_NAME;
const EXCLUDED_NAMES = process.env.EXCLUDED_NAMES;
const PLACES_PER_SEARCH = parseInt(process.env.PLACES_PER_SEARCH);
const NON_CHINESE_IDS = process.env.NON_CHINESE_IDS;

/* Parse files with names and areas */
const list_of_names = babyparse
  .parseFiles(NAMES_INPUT_FILE_NAME)
  .data.map(element => element[0]);
const list_of_areas = babyparse
  .parseFiles(AREAS_INPUT_FILE_NAME)
  .data.map(element => element[0]);

/* parse file with non-chinese ids */
const list_of_non_chinese_ids = babyparse
  .parseFiles(NON_CHINESE_IDS)
  .data.map(element => element[0]);

const list_of_searchstrings = MakeSearchstringsOfPlaces(
  list_of_areas,
  PLACES_PER_SEARCH
);

let list_of_persons = [];

async function RunSearch() {
  for (let searchstring of list_of_searchstrings) {
    for (let name of list_of_names) {
      const result = await FindPersonsWithLastnameInArea(name, searchstring);
      Array.prototype.push.apply(list_of_persons, result);

      const searches_left =
        (list_of_searchstrings.length -
          list_of_searchstrings.indexOf(searchstring)) *
          list_of_names.length -
        (list_of_names.indexOf(name) + 1);
      console.log("Total hitcount: " + list_of_persons.length);
      console.log("Searches left: " + searches_left);
    }
  }
  console.log("size: ", list_of_persons.length);

  // list_of_persons = _
  //   .uniqBy(list_of_persons, "Id")
  //   .filter(person => list_of_non_chinese_ids.indexOf(person.Id) < 0);

  // console.log("size: ", list_of_persons.length);

  // list_of_persons = list_of_persons.map(person => {
  //   person.AddressCity = person.Address + person.City;
  //   return person;
  // });
  // list_of_persons = _.uniqBy(list_of_persons, "AddressCity");

  // console.log("size: ", list_of_persons.length);

  list_of_persons = list_of_persons.map(person => [
    ,
    ,
    ,
    ,
    person.FirstName + " " + person.LastName,
    ,
    person.Address,
    person.City,
    ,
    ,
    "Sweden",
    ,
    ,
    ,
    ,
    ,
  ]);

  //lists_of_chunks = SplitArrayIntoChunks(list_of_persons);

  //for (let chunk of lists_of_chunks) {
  AddAlbaHeaders(list_of_persons);
  //}

  //for (let i = 0; i < list_of_persons.length; i++) {
  WriteToFile(OUTPUT_FILE_NAME + ".csv", babyparse.unparse(list_of_persons));
  //}
}
RunSearch();
