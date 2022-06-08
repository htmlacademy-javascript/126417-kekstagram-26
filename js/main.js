function getRandomInteger(min, max) {
  if (min < 0 || max < 0) {
    return undefined;
  }

  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(5,9);
