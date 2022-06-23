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

const createMessage = () => {
  const messageCount = getRandomInteger(MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT);
  const message = [];
  for (let i = 1; i <= messageCount; i++ ) {
    message.push(getRandomArrayElement(MESSAGES));
  }
  return message.join(' ');
};

const createComment = () => {
  const comments = [];
  const commentsCount = getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  let commentId = 1;

  for (let i = 1; i <= commentsCount; i++) {
    const avatarId = getRandomInteger(MIN_AVATARS_COUNT, MAX_AVATARS_COUNT);

    comments.push({
      id: commentId++,
      avatar: `img/avatar-${avatarId}.svg`,
      message: createMessage(),
      name: getRandomArrayElement(NAMES)
    });
  }
  return comments;
};

const generateObject = (count) => {
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

generateObject(PHOTOS_COUNT);
