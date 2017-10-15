function PersonHasLastname(person, name) {
  return person.LastName
    .split(" ")
    .map(lastname => lastname.toUpperCase())
    .includes(name.toUpperCase());
}

module.exports = PersonHasLastname;
