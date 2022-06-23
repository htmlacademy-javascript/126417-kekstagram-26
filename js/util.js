const getRandomInteger = (min, max) => {
  let lower = Math.abs(min);
  let upper = Math.abs(max);

  if (lower > upper) {
    const changeLower = lower;
    lower = upper;
    upper = changeLower;
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomUniqueIntegerArray = (min, max) => {
  const set = new Set();
  let result = [];
  const count = Math.abs(Math.abs(max) - Math.abs(min)) + 1;

  while (set.size < count) {
    set.add(getRandomInteger(min, max));
  }

  result = Array.from(set);
  return result;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const checkLengthString = (string, maxLength) => string.length <= maxLength;

checkLengthString('hello, my dear', 1);

export {getRandomInteger, getRandomUniqueIntegerArray, getRandomArrayElement};
