import { isEscapeKey } from './util.js';
import { onUpLoadModalEscKeydown } from './user-modal.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successModalElement = successTemplateElement.cloneNode(true);
const successButtonElement = successModalElement.querySelector('.success__button');

const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorModalElement = errorTemplateElement.cloneNode(true);
const errorButtonElement = errorModalElement.querySelector('.error__button');

const Z_INDEX = 10;
const bodyElement = document.querySelector('body');

const onSuccessModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    closeSuccessMessageModal();
  }
};

const onErrorModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    closeErrorMessageModal();
  }
};

const onSuccessBackDropClick = (evt) => {
  if (evt.target === successModalElement) {
    closeSuccessMessageModal();
  }
};

const onErrorBackDropClick = (evt) => {
  if (evt.target === errorModalElement) {
    closeErrorMessageModal();
  }
};

function closeSuccessMessageModal () {
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
  document.removeEventListener('click', onSuccessBackDropClick);
  successModalElement.remove();
}

function closeErrorMessageModal () {
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  document.removeEventListener('click', onErrorBackDropClick);
  document.addEventListener('keydown', onUpLoadModalEscKeydown);

  errorModalElement.remove();
}

const showSuccessModal = () => {
  successModalElement.style.zIndex = Z_INDEX;

  bodyElement.append(successModalElement);

  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onSuccessBackDropClick);
  successButtonElement.addEventListener('click', closeSuccessMessageModal);
};

const showErrorModal = () => {
  errorModalElement.style.zIndex = Z_INDEX;

  bodyElement.append(errorModalElement);

  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onErrorBackDropClick);
  errorButtonElement.addEventListener('click', closeErrorMessageModal);
  document.removeEventListener('keydown', onUpLoadModalEscKeydown);

};

export {showSuccessModal, showErrorModal, errorModalElement};
