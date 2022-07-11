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
  const count = Math.abs(Math.abs(max) - Math.abs(min)) + 1;

  while (set.size < count) {
    set.add(getRandomInteger(min, max));
  }

  return Array.from(set);

};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createChunks = (elements, chunkSize) => {
  const result = [];

  for (let i = 0; i < elements.length; i+=chunkSize ) {
    result.push(elements.slice(i, i+chunkSize));
  }
  return result;
};

export {getRandomInteger, getRandomUniqueIntegerArray, getRandomArrayElement, isEscapeKey, createChunks};
