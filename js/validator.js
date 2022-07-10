const MAX_HASHTAGS_COUNT = 5;
const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const getHashtags = (value) => value.trim().toLowerCase().split(' ');
const hashtagsInputElement = imgUpLoadFormElement.querySelector('.text__hashtags');

const pristine = new Pristine(imgUpLoadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

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
  'Хэш-тег должен начинаться с # и содержать только цифры и буквы');
pristine.addValidator(hashtagsInputElement, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(hashtagsInputElement, validateHashtagsCount, 'Нельзя указать больше пяти хэш-тегов');

imgUpLoadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imgUpLoadFormElement.submit();
  }
});

export {hashtagsInputElement};
