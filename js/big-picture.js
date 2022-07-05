import {isEscapeKey} from './util.js';
import {galleryPhotos} from './pictures.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement  = bigPictureElement.querySelector('.big-picture__img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentElement =commentsContainerElement.querySelector('.social__comment');
const descriptionPhotoElement = bigPictureElement.querySelector('.social__caption');
const commentsCounterElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeBigPictureBtnElement = bigPictureElement.querySelector('#picture-cancel');

let closeBigPicture = () => {};

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createCommentsList = (comments) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const newCommentElement = commentElement.cloneNode(true);
    const authorCommentElement = newCommentElement.querySelector('.social__picture');
    const commentTextElement = newCommentElement.querySelector('.social__text');
    authorCommentElement.src = item.avatar;
    authorCommentElement.alt = item.name;
    authorCommentElement.width = '35';
    authorCommentElement.height ='35';

    commentTextElement.textContent = item.message;

    commentFragment.append(newCommentElement);
  });

  commentsContainerElement.append(commentFragment);
};

const fillDataBigPicture = (photo) => {
  const {url, description, likes, comments} = photo;
  bigPictureImgElement.src = url;
  descriptionPhotoElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsCounterElement.textContent = comments.length;
  createCommentsList(comments);
};

const openBigPicture = (index) => {
  const currentOpenPicture = galleryPhotos[index];

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  commentsCountElement.classList.add('.hidden');
  commentsLoaderElement.classList.add('.hidden');
  fillDataBigPicture(currentOpenPicture);

  document.addEventListener('keydown', onBigPictureEscKeydown);
};

closeBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

closeBigPictureBtnElement.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};
