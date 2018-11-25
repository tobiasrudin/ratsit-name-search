function PersonHasLastname(person, name) {
  person.LastName = person.LastName + "";
  return person.LastName.split(" ")
    .map(lastname => lastname.toUpperCase())
    .includes(name.toUpperCase());
}

module.exports = PersonHasLastname;
