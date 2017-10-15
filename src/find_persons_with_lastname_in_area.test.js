const expect = require("chai").expect;
const FindPersonsWithLastnameInArea = require("./find_persons_with_lastname_in_area");
const PersonHasLastname = require("./person_has_lastname.js");

describe("Find persons with lastnames in areas", function() {
  this.timeout(10000);

  it("should return an array with persons having lastname in area", async function() {
    const test_case_1 = await FindPersonsWithLastnameInArea("Kaya", "Göteborg");
    const test_case_2 = await FindPersonsWithLastnameInArea(
      "Sfkdosldkjfls",
      "Göteborg"
    );
    expect(test_case_1).to.be.an("array");
    expect(PersonHasLastname(test_case_1[0], "Kaya")).to.equal(true);
    expect(test_case_2).to.be.an("array");
  });
});
