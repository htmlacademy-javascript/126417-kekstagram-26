import {getRandomInteger, getRandomUniqueIntegerArray, getRandomArrayElement} from './util.js';
import {createComment} from './comment.js';
import {PHOTOS_COUNT, MIN_LIKES_COUNT, MAX_LIKES_COUNT, DESCRIPTIONS} from './data.js';

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

export {generatePhoto};
