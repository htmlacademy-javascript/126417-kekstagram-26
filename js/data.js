import {getRandomInteger, getRandomUniqueIntegerArray, getRandomArrayElement} from './util.js';
import {createComment} from './comment.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_AVATARS_COUNT = 1;
const MAX_AVATARS_COUNT = 6;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 5;
const MIN_MESSAGES_COUNT = 1;
const MAX_MESSAGES_COUNT = 2;

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

const MESSAGES = [
  'Всё отлично!',
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

const generatePhoto = (count) => {
  const photos = [];
  const shuffleArray = getRandomUniqueIntegerArray(1, count);

  for (let i = 0; i < count; i++) {
    const photoId = shuffleArray[i];
    const url = shuffleArray[i];

    photos.push(
      {
        id: photoId,
        url:  `photos/${url}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS),
        likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
        comments: createComment()
      }
    );
  }

  return photos;
};

generatePhoto(PHOTOS_COUNT);

export {
  MIN_AVATARS_COUNT,
  MAX_AVATARS_COUNT,
  MIN_COMMENTS_COUNT,
  MAX_COMMENTS_COUNT,
  MIN_MESSAGES_COUNT,
  MAX_MESSAGES_COUNT,
  MESSAGES,
  NAMES,
  generatePhoto
};


