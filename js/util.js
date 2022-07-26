import { ALERT_SHOW_TIME } from './data.js';

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const createChunks = (elements, chunkSize) => {
  const result = [];

  for (let i = 0; i < elements.length; i+=chunkSize ) {
    result.push(elements.slice(i, i+chunkSize));
  }
  return result;
};

const getCorrectWord = (number) => {
  let word = 'комментарий';
  if (number % 100 === 1) {
    word = 'комментария';
  } else {
    word = 'комментариев';
  }
  return `${number} ${word}`;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');

  const alertMessage = document.createElement('p');
  alertMessage.classList.add('alert__message');
  alertMessage.textContent = message;

  alertContainer.append(alertMessage);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomUniqueIntegerArray,
  isEscapeKey,
  createChunks,
  getCorrectWord,
  showAlert,
  debounce};
