import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

const showStatusModal = (type) => {
  const statusTemplateElement = document.querySelector(`#${type}`)
    .content.querySelector(`.${type}`);
  const statusModalElement = statusTemplateElement.cloneNode(true);
  const statusButtonElement = statusModalElement.querySelector(`.${type}__button`);
  bodyElement.append(statusModalElement);

  const onStatusModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      if ((document.querySelector(`.${type}`))) {
        closeStatusMessageModal();
      }
    }
  };

  const onBackDropClick = (evt) => {
    if (evt.target.className !== `${type}__inner` &&
      evt.target.className !== `${type}__title`) {
      closeStatusMessageModal();
    }
  };

  statusButtonElement.addEventListener('click', () => {
    closeStatusMessageModal();
  });

  document.addEventListener('keydown', onStatusModalEscKeydown);
  document.addEventListener('click', onBackDropClick);

  function closeStatusMessageModal () {
    statusModalElement.remove();
    document.removeEventListener('keydown', onStatusModalEscKeydown);
    document.removeEventListener('click', onBackDropClick);

  }
};

export {showStatusModal};
