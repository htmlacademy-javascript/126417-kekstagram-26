import { isEscapeKey } from './util.js';
import { bodyElement } from './big-picture.js';

const imgUpLoadFormElement = document.querySelector('.img-upload__form');
const upLoadFileInputElement = imgUpLoadFormElement.querySelector('#upload-file');
const imgUpLoadOverLayElement = imgUpLoadFormElement.querySelector('.img-upload__overlay');
const imgUpLoadCancelBtnElement = imgUpLoadOverLayElement.querySelector('#upload-cancel');

const onUpLoadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUpLoadOverlay();
  }
};

upLoadFileInputElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  imgUpLoadOverLayElement.classList.remove('hidden');

  document.addEventListener('keydown', onUpLoadOverlayEscKeydown);
});

function closeUpLoadOverlay() {
  imgUpLoadOverLayElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onUpLoadOverlayEscKeydown);
}

imgUpLoadCancelBtnElement.addEventListener('click', () => {
  closeUpLoadOverlay();
});
