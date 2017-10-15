const expect = require("chai").expect;
const PersonHasLastname = require("./person_has_lastname.js");

describe("Person has lastname", function() {
  it("should check if string Object.LastName contains name", function() {
    const test_case_1 = PersonHasLastname(
      { LastName: "Svensson Wang Rönn" },
      "Jonsson"
    );
    const test_case_2 = PersonHasLastname(
      { LastName: "Svensson Wang Rönn" },
      "Wang"
    );
    expect(test_case_1).to.equal(false);
    expect(test_case_2).to.equal(true);
  });
});
