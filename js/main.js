function getRandomInteger(min, max) {
  const lower = Math.abs(min);
  const upper = Math.abs(max);

  if (lower > upper) {
    return Math.floor(Math.random() * (lower - upper + 1)) + upper;
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

getRandomInteger(5, 9);

function checkLengthString(string, maxLength) {
  return string.length <= maxLength;
}

checkLengthString('hello, my dear', 1);
