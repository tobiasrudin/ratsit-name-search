let SplitArrayIntoChunks = array => {
  let i,
    j,
    temparray = [],
    chunk = 100;
  for (i = 0, j = array.length; i < j; i += chunk) {
    temparray.push(array.slice(i, i + chunk));
  }
  return temparray;
};

module.exports = SplitArrayIntoChunks;
