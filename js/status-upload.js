import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('.body');
const successTemplateElement = document.querySelector('#success').content;
const errorTemplateElement = document.querySelector('#error').content;
const successButtonElement = successTemplateElement.querySelector('.success__button');
const errorButtonElement = errorTemplateElement.querySelector('.error__button');

const onStatusModalBtnClick = (evt) => {
  if (evt.target.className === 'success__button') {
    closeSuccessMessageModal();
  } else {
    closeErrorMessageModal();
  }
};

const onStatusModalEscKeydown  = (evt) => {
  if (isEscapeKey(evt)) {
    if ((document.querySelector('.success'))) {
      closeSuccessMessageModal();
    } else {
      closeErrorMessageModal();
    }
  }
};

const onWindowSuccessClick = (evt) => {
  if (evt.target.className !== 'success__inner' &&
      evt.target.className !== 'success__title') {
    closeSuccessMessageModal();
  }
};

const onWindowErrorClick = (evt) => {
  if (evt.target.className !== 'error__inner' &&
      evt.target.className !== 'error__title') {
    closeErrorMessageModal();
  }
};

const showSuccessModal = () => {
  const successModalFragment = document.createDocumentFragment();
  const successModalElement = successTemplateElement.cloneNode(true);
  successModalFragment.append(successModalElement);
  bodyElement.append(successModalFragment);

  successButtonElement.addEventListener('click', onStatusModalBtnClick);
  document.addEventListener('keydown', onStatusModalEscKeydown);
  successTemplateElement.addEventListener('click', onWindowSuccessClick);
};

function closeSuccessMessageModal () {
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onStatusModalEscKeydown);
  successTemplateElement.remove();
}

const showErrorModal = () => {
  const errorModalFragment = document.createDocumentFragment();
  const errorModalElement = errorTemplateElement.cloneNode(true);
  errorModalFragment.append(errorModalElement);

  bodyElement.append(errorModalFragment);

  errorButtonElement.addEventListener('click', onStatusModalBtnClick);
  document.addEventListener('keydown', onStatusModalEscKeydown);
  errorTemplateElement.addEventListener('click', onWindowErrorClick);
};

function closeErrorMessageModal () {
  document.removeEventListener('keydown', onStatusModalEscKeydown);
  errorTemplateElement.remove();
}

export {showSuccessModal,
  closeSuccessMessageModal,
  showErrorModal,
  closeErrorMessageModal
};
