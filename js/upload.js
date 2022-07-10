import { isEscapeKey } from './util.js';
import { bodyElement } from './big-picture.js';

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const ALLOWED_FORMATS_PHOTO = ['png', 'jpeg', 'jpg'];

const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const upLoadFileInputElement = imgUpLoadFormElement.querySelector('#upload-file');//поле загрузить
const imgUpLoadOverLayElement = imgUpLoadFormElement.querySelector('.img-upload__overlay');//форма редактирования
const imgUpLoadCancelBtnElement = imgUpLoadOverLayElement.querySelector('#upload-cancel');//кнопка закрытия
const imgUpLoadPreviewElement = imgUpLoadOverLayElement.querySelector('.img-upload__preview img');//дефолтное изображение
const textInputHashtagsElement = imgUpLoadOverLayElement.querySelector('.text__hashtags');
const textCommentsElement  = imgUpLoadOverLayElement.querySelector('.text__description');
//const photoPreviewEffectsElement = imgUpLoadOverLayElement.querySelector('.effects__preview');

const pristine = new Pristine(imgUpLoadFormElement);

imgUpLoadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

const onUpLoadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === textInputHashtagsElement || document.activeElement === textCommentsElement) {
      evt.stopPropagation();
    } else {
      closeUpLoadOverlay();
    }
  }
};

upLoadFileInputElement.addEventListener('change', () => {

  imgUpLoadOverLayElement.classList.remove('hidden');
  imgUpLoadPreviewElement.src =

  document.addEventListener('keydown', onUpLoadOverlayEscKeydown);
});

function closeUpLoadOverlay() {
  imgUpLoadOverLayElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onUpLoadOverlayEscKeydown);
  imgUpLoadFormElement.reset();
  upLoadFileInputElement.value = '';
  imgUpLoadPreviewElement.src = DEFAULT_IMAGE;
}

imgUpLoadCancelBtnElement.addEventListener('click', () => {
  closeUpLoadOverlay();
});

