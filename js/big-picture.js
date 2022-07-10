import {isEscapeKey} from './util.js';
import {AVATAR_WIDTH, AVATAR_HEIGHT} from './data.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement  = bigPictureElement.querySelector('.big-picture__img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentElement =commentsContainerElement.querySelector('.social__comment');
const descriptionPhotoElement = bigPictureElement.querySelector('.social__caption');
const commentsCounterElement = bigPictureElement.querySelector('.social__comment-count');
const totalCommentsCountElement = commentsCounterElement.querySelector('.comments-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeBigPictureBtnElement = bigPictureElement.querySelector('#picture-cancel');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  commentsCountElement.classList.add('.hidden');
  commentsLoaderElement.classList.add('.hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);

};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

closeBigPictureBtnElement.addEventListener('click', () => {
  closeBigPicture();
});

const createCommentsList = (comments) => {
  const commentFragmentElement = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newCommentElement = commentElement.cloneNode(true);
    const authorCommentElement = newCommentElement.querySelector('.social__picture');
    const commentTextElement = newCommentElement.querySelector('.social__text');
    authorCommentElement.src = comment.avatar;
    authorCommentElement.alt = comment.name;
    authorCommentElement.width = AVATAR_WIDTH;
    authorCommentElement.height = AVATAR_HEIGHT;

    commentTextElement.textContent = comment.message;

    commentFragmentElement.append(newCommentElement);
  });
  commentsContainerElement.textContent = '';
  commentsContainerElement.append(commentFragmentElement);
};

const fillDataBigPicture = ({url, description, likes, comments}) => {
  bigPictureImgElement.querySelector('img').src = url;
  descriptionPhotoElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsCounterElement.textContent = `${comments.length} из ${totalCommentsCountElement.textContent} комментариев`;
  openBigPicture();
};


export {createCommentsList, fillDataBigPicture, bodyElement};
