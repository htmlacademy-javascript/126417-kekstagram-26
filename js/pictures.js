import {createLoadingCommentsList, fillDataBigPicture} from './big-picture.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const initPictures = (photos) => {

  const pictureListFragmentElement = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      fillDataBigPicture({url, description, likes});
      createLoadingCommentsList(comments);
    });
    pictureListFragmentElement.append(pictureElement);
  }
  );
  pictureListElement.append(pictureListFragmentElement);

};

export {initPictures};
