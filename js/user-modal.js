import { isEscapeKey } from './util.js';
import { bodyElement } from './big-picture.js';
import {scaleControlBiggerBtnElement, scaleControlSmallerBtnElement, setDefaultPhotoScale,
  onIncreaseScalePhotoClick, onDecreaseScalePhotoClick} from './scale-photo.js';
import {createSlider, destroySlider } from './effect-photo.js';
import { validateUploadForm, pristine } from './validate-form.js';
import { sendData } from './api.js';
import {showSuccessModal, showErrorModal} from './status-upload.js';
import { uploadNewPhoto } from './upload-photo.js';

const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const upLoadFileInputElement = imgUpLoadFormElement.querySelector('#upload-file');
const imgUpLoadOverLayElement = imgUpLoadFormElement.querySelector('.img-upload__overlay');
const imgUpLoadCancelBtnElement = imgUpLoadOverLayElement.querySelector('#upload-cancel');
const textCommentsElement  = imgUpLoadOverLayElement.querySelector('.text__description');
const hashtagsInputElement = imgUpLoadFormElement.querySelector('.text__hashtags');
const imgUpLoadSubmitBtnElement = imgUpLoadFormElement.querySelector('.img-upload__submit');

const onUpLoadModalEscKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  if (evt.target.matches('input') && evt.target.type === 'text' || evt.target.matches('textarea')) {
    return;
  }
  closeUpLoadModal();
};

const openUpLoadModal = () => {
  imgUpLoadOverLayElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  createSlider();
  scaleControlBiggerBtnElement.addEventListener('click', onDecreaseScalePhotoClick);
  scaleControlSmallerBtnElement.addEventListener('click', onIncreaseScalePhotoClick);
  document.addEventListener('keydown', onUpLoadModalEscKeydown);
  imgUpLoadCancelBtnElement.addEventListener('click', closeUpLoadModal);
  uploadNewPhoto();
};

upLoadFileInputElement.addEventListener('change', openUpLoadModal);

function closeUpLoadModal() {
  imgUpLoadOverLayElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  setDefaultPhotoScale();
  destroySlider();
  scaleControlBiggerBtnElement.removeEventListener('click', onDecreaseScalePhotoClick);
  scaleControlSmallerBtnElement.removeEventListener('click', onIncreaseScalePhotoClick);
  document.removeEventListener('keydown', onUpLoadModalEscKeydown);
  imgUpLoadCancelBtnElement.removeEventListener('click', closeUpLoadModal);
  imgUpLoadFormElement.reset();
  upLoadFileInputElement.value = '';
  hashtagsInputElement.value = '';
  textCommentsElement.value = '';
  pristine.reset();
}

const blockSubmitButton = () => {
  imgUpLoadSubmitBtnElement.disabled = true;
  imgUpLoadSubmitBtnElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUpLoadSubmitBtnElement.disabled = false;
  imgUpLoadSubmitBtnElement.textContent = 'Опубликовать';
};

const setUserModalSubmit = () => {
  imgUpLoadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();

    const isValid = validateUploadForm();
    if (isValid) {
      sendData(
        () => {
          unblockSubmitButton();
          closeUpLoadModal();
          showSuccessModal();
        },
        () => {
          blockSubmitButton();
          showErrorModal();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserModalSubmit};
