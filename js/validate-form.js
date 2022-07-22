import { MIN_HASHTAGS_COUNT, MAX_HASHTAGS_COUNT, MAX_LENGTH_COMMENT } from './data.js';

const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const imgUpLoadOverLayElement = imgUpLoadFormElement.querySelector('.img-upload__overlay');
const textCommentsElement  = imgUpLoadOverLayElement.querySelector('.text__description');
const hashtagsInputElement = imgUpLoadFormElement.querySelector('.text__hashtags');

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

const validateUploadForm = () => pristine.validate();

export {validateUploadForm};
