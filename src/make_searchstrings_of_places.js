function MakeSearchstringsOfPlaces(places, chunk_size) {
  const string_maker = (array, chunk_size) =>
    Array(Math.ceil(array.length / chunk_size))
      .fill()
      .map((_, index) => index * chunk_size)
      .map(begin => array.slice(begin, begin + chunk_size))
      .map(temparray => temparray.join(" OR "));

  return string_maker(places, chunk_size);
}

module.exports = MakeSearchstringsOfPlaces;
