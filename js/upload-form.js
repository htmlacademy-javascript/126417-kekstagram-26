import { MIN_HASHTAGS_COUNT, MAX_HASHTAGS_COUNT, MAX_LENGTH_COMMENT } from './data.js';
import { isEscapeKey } from './util.js';
import { bodyElement } from './big-picture.js';
import {scaleControlBiggerBtnElement, scaleControlSmallerBtnElement,
  increaseScalePhoto, decreaseScalePhoto} from './scale-photo.js';
import {createSlider, destroySlider } from './effect-photo.js';

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const upLoadFileInputElement = imgUpLoadFormElement.querySelector('#upload-file');
const imgUpLoadOverLayElement = imgUpLoadFormElement.querySelector('.img-upload__overlay');
const imgUpLoadCancelBtnElement = imgUpLoadOverLayElement.querySelector('#upload-cancel');
const imgUpLoadPreviewElement = imgUpLoadOverLayElement.querySelector('.img-upload__preview img');
const textCommentsElement  = imgUpLoadOverLayElement.querySelector('.text__description');
const hashtagsInputElement = imgUpLoadFormElement.querySelector('.text__hashtags');

const onUpLoadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsInputElement || document.activeElement === textCommentsElement) {
      evt.stopPropagation();
    } else {
      closeUpLoadOverlay();
    }
  }
};

const openUpLoadOverlay = () => {
  imgUpLoadOverLayElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  createSlider();
  scaleControlBiggerBtnElement.addEventListener('click', decreaseScalePhoto);
  scaleControlSmallerBtnElement.addEventListener('click', increaseScalePhoto);
  document.addEventListener('keydown', onUpLoadOverlayEscKeydown);
};

upLoadFileInputElement.addEventListener('change', openUpLoadOverlay);

function closeUpLoadOverlay() {
  imgUpLoadOverLayElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  destroySlider();
  scaleControlBiggerBtnElement.removeEventListener('click', decreaseScalePhoto);
  scaleControlSmallerBtnElement.removeEventListener('click', increaseScalePhoto);
  document.removeEventListener('keydown', onUpLoadOverlayEscKeydown);
  imgUpLoadFormElement.reset();
  upLoadFileInputElement.value = '';
  imgUpLoadPreviewElement.src = DEFAULT_IMAGE;
}

imgUpLoadCancelBtnElement.addEventListener('click', () => {
  closeUpLoadOverlay();
});

const pristine = new Pristine(imgUpLoadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field--error'
});

const checkLengthComment = (comment) => comment.length <= MAX_LENGTH_COMMENT;

const getHashtags = (value) => {
  const hashtags =  value.toLowerCase().split(' ');
  return hashtags.filter((hashtag) => hashtag !== '');
};

const validateHashtags = (value) => {
  const hashtags = getHashtags(value);
  const hashtagsRule = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  return value === ''|| hashtags.every((hashtag) => hashtagsRule.test(hashtag));
};

const validateUniqueHashtags = (value) => {
  const hashtags = getHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validateHashtagsCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

pristine.addValidator(hashtagsInputElement, validateHashtags,
  `Хэш-тег должен начинаться с # и содержать хотя бы ${MIN_HASHTAGS_COUNT} символ (буквы и цифры)`);
pristine.addValidator(hashtagsInputElement, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(hashtagsInputElement, validateHashtagsCount, `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`);
pristine.addValidator(textCommentsElement, checkLengthComment, `Комментарий не должен быть длиннее ${MAX_LENGTH_COMMENT} символов`);

imgUpLoadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imgUpLoadFormElement.submit();
  }
});
