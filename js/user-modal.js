import { isEscapeKey } from './util.js';
import { bodyElement } from './big-picture.js';
import {scaleControlBiggerBtnElement, scaleControlSmallerBtnElement,
  increaseScalePhoto, decreaseScalePhoto} from './scale-photo.js';
import {createSlider, destroySlider } from './effect-photo.js';
import { validateUploadForm } from './validate-form.js';
import { sendData } from './api.js';
import { showSuccessModal, showErrorModal} from './status-upload.js';

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const upLoadFileInputElement = imgUpLoadFormElement.querySelector('#upload-file');
const imgUpLoadOverLayElement = imgUpLoadFormElement.querySelector('.img-upload__overlay');
const imgUpLoadCancelBtnElement = imgUpLoadOverLayElement.querySelector('#upload-cancel');
const imgUpLoadPreviewElement = imgUpLoadOverLayElement.querySelector('.img-upload__preview img');
const textCommentsElement  = imgUpLoadOverLayElement.querySelector('.text__description');
const hashtagsInputElement = imgUpLoadFormElement.querySelector('.text__hashtags');
const imgUpLoadSubmitBtnElement = imgUpLoadFormElement.querySelector('.img-upload__submit');

const onUpLoadModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsInputElement || document.activeElement === textCommentsElement) {
      evt.stopPropagation();
    } else {
      closeUpLoadModal();
    }
  }
};

const openUpLoadModal = () => {
  imgUpLoadOverLayElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  createSlider();
  scaleControlBiggerBtnElement.addEventListener('click', decreaseScalePhoto);
  scaleControlSmallerBtnElement.addEventListener('click', increaseScalePhoto);
  document.addEventListener('keydown', onUpLoadModalEscKeydown);
};


upLoadFileInputElement.addEventListener('change', openUpLoadModal);

function closeUpLoadModal() {
  imgUpLoadOverLayElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  destroySlider();
  scaleControlBiggerBtnElement.removeEventListener('click', decreaseScalePhoto);
  scaleControlSmallerBtnElement.removeEventListener('click', increaseScalePhoto);
  document.removeEventListener('keydown', onUpLoadModalEscKeydown);
  imgUpLoadFormElement.reset();
  upLoadFileInputElement.value = '';
  imgUpLoadPreviewElement.src = DEFAULT_IMAGE;
}

imgUpLoadCancelBtnElement.addEventListener('click', () => {
  closeUpLoadModal();
});


const blockSubmitButton = () => {
  imgUpLoadSubmitBtnElement.setAttribute('disabled', true);
  imgUpLoadSubmitBtnElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUpLoadSubmitBtnElement.removetAttribute('disabled', true);
  imgUpLoadSubmitBtnElement.textContent = 'Опубликовать';
};

const setUserModalSubmit = () => {
  imgUpLoadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

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
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserModalSubmit};
