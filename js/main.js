const getRandomInteger = (min, max) => {
  const lower = Math.abs(min);
  const upper = Math.abs(max);

  if (lower > upper) {
    return Math.floor(Math.random() * (lower - upper + 1)) + upper;
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

getRandomInteger(5, 9);

const getRandomUniqueInteger = (min, max, count = 25) => {
  const set = new Set();
  let result = [];

  while (set.size < count) {
    set.add(getRandomInteger(min, max));
  }

  result = Array.from(set);
  
  return result[Math.floor(Math.random() * result.length)];
};

getRandomUniqueInteger(1, 15, 5);

const checkLengthString = (string, maxLength) => {
  return string.length <= maxLength;
};

checkLengthString('hello, my dear', 1);

const getUrlPhoto = () => {
  const numberPhoto = getRandomUniqueInteger(1, 25);
  return `photos/${numberPhoto}.jpg`;
};

const createObject = () => {
    const uniqueId = getRandomUniqueInteger(1, 25);
    const url = photos/{{i}}.jpg;

  return {
    id: ,
    url,
    description: 'Встреча рассвета',
    likes: getRandomInteger(15, 200),
    comments: {
      id, 
      avatar, 
      img, 
      message, 
      name
    }
  };
};