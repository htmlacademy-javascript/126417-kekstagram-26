const ID_COUNT = 25;
const URLS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const AVATARS_COUNT = 6;

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
  'Описание 9',
  'Описание 10'
];

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Анна',
  'Сергей',
  'Евгений',
  'Илья',
  'Мария',
  'Светлана',
  'Дария',
  'Николай',
  'Дмитрий',
  'Юрий'
];

//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInteger = (min, max) => {
  const lower = Math.abs(min);
  const upper = Math.abs(max);

  if (lower > upper) {
    return Math.floor(Math.random() * (lower - upper + 1)) + upper;
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

const createPost = () => {
  const idNumbers = getRandomUniqueIntegerArray(1, ID_COUNT);
  const urls = getRandomUniqueIntegerArray(1, URLS_COUNT);
  const idAvatars = getRandomUniqueIntegerArray(1, 999);
  const avatars = getRandomUniqueIntegerArray(1, AVATARS_COUNT);

  return {
    id: getRandomArrayElement(idNumbers),
    url: `photos/${getRandomArrayElement(urls)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: [
      {
        id: getRandomArrayElement(idAvatars),
        avatar: `img/avatar-${getRandomArrayElement(avatars)}.svg`,
        message: getRandomArrayElement(MESSAGES),
        name: getRandomArrayElement(NAMES)
      }
    ]
  };
};

createPost();
