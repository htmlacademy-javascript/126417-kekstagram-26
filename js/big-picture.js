import {isEscapeKey,createChunks, getCorrectWord} from './util.js';
import {AVATAR_WIDTH, AVATAR_HEIGHT, COMMENTS_CHUNK_SIZE} from './data.js';

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
const commentsLoaderBtnElement = bigPictureElement.querySelector('.social__comments-loader');

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
  closeBigPictureBtnElement.addEventListener('click', closeBigPicture);
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  closeBigPictureBtnElement.removeEventListener('click', closeBigPicture);
}

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
  commentsContainerElement.append(commentFragmentElement);
};

const createLoadingCommentsList = (comments) => {
  commentsContainerElement.textContent = '';
  commentsLoaderBtnElement.classList.remove('hidden');

  let i = 0;
  let loadingCommentsLength = 0;

  const commentsChunks = createChunks(comments, COMMENTS_CHUNK_SIZE);

  if (comments.length === 0) {
    commentsCounterElement.textContent = 'Комментариев нет';
    commentsLoaderBtnElement.classList.add('hidden');
  }

  const appendComments = () => {
    createCommentsList(commentsChunks[i]);
    loadingCommentsLength += commentsChunks[i].length;
    i++;
    commentsCounterElement.textContent = `${loadingCommentsLength} из ${getCorrectWord(comments.length)}`;
    if (commentsChunks.length <= i) {
      commentsLoaderBtnElement.classList.add('hidden');
      commentsLoaderBtnElement.removeEventListener('click', appendComments);
    }
  };

  commentsLoaderBtnElement.addEventListener('click', appendComments);
  appendComments();
};

const fillDataBigPicture = ({url, description, likes}) => {

  bigPictureImgElement.querySelector('img').src = url;
  descriptionPhotoElement.textContent = description;
  likesCountElement.textContent = likes;
  openBigPicture();
};

export {createLoadingCommentsList, fillDataBigPicture, bodyElement};
