import {getRandomInteger, getRandomArrayElement} from './util.js';
import {MIN_AVATARS_COUNT, MAX_AVATARS_COUNT, MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT,
  MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT, MESSAGES, NAMES} from './data.js';

let commentId = 1;

const createMessage = () => {
  const messageCount = getRandomInteger(MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT);
  const messages = [];
  for (let i = 1; i <= messageCount; i++ ) {
    messages.push(getRandomArrayElement(MESSAGES));
  }
  return messages.join(' ');
};

const createComment = () => {
  const comments = [];
  const commentsCount = getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

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

export {createComment};
