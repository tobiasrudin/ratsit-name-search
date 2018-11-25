/* EXTERNAL MODULES */
let moment = require("moment");

/* OWN MODULES */
const RatsitSearch = require("./ratsit_search");
const PersonHasLastname = require("./person_has_lastname.js");

async function FindPersonsWithLastnameInArea(name, area) {
  let current_age_limit;
  let list_of_persons = [];
  let age_to = 120;
  let list = [];
  let hitcount_larger_than_100 = true;
  while (hitcount_larger_than_100) {
    try {
      const response = await RatsitSearch(name, area, age_to);
      const search_result = response.Envelope.Body.SearchPersonCriteriaResponse;
      console.log(
        "Hitcount (" + name + "): ",
        search_result.PersonSearchResult.HitCount
      );
      if (parseInt(search_result.PersonSearchResult.HitCount) > 100) {
        age_to = moment().diff(
          search_result.PersonSearchResult.Hits.PersonSearchHit[99].BirthDate,
          "years"
        );
        if (age_to === current_age_limit) {
          age_to -= 1;
        }
      } else {
        hitcount_larger_than_100 = false;
      }
      current_age_limit = age_to;
      let ratsit_name_search = [];

      /* If there's only 1 hit Ratsit returns a single object and not an array.
			Putting object in array for simplicity */
      if (search_result.PersonSearchResult.HitCount > 0)
        ratsit_name_search =
          search_result.PersonSearchResult.HitCount == 1
            ? [search_result.PersonSearchResult.Hits.PersonSearchHit]
            : search_result.PersonSearchResult.Hits.PersonSearchHit;

      Array.prototype.push.apply(
        list_of_persons,
        ratsit_name_search.filter(person => PersonHasLastname(person, name))
      );
    } catch (err) {
      console.log(err);
      process.exit();
    }
  }
  return list_of_persons;
}

module.exports = FindPersonsWithLastnameInArea;
