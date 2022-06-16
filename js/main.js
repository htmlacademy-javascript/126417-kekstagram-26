const getRandomInteger = (min, max) => {
  const lower = Math.abs(min);
  const upper = Math.abs(max);

  if (lower > upper) {
    return Math.floor(Math.random() * (lower - upper + 1)) + upper;
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

getRandomInteger(5, 9);

const getRandomUniqueInteger = (min, max, count) => {
  const set = new Set();

  while (set.size < count) {
    set.add(getRandomInteger(min, max));
  }
  return Array.from(set);
};

getRandomUniqueInteger(1, 25, 25);

const checkLengthString = (string, maxLength) => {
  return string.length <= maxLength;
};

checkLengthString('hello, my dear', 1);

const createObject = () => {
  return {
    id: ,
    url,
    description,
    likes,
    comments: {
      id, 
      avatar, 
      img, 
      message, 
      name
    }
  };
};