import { getRandomUniqueIntegerArray, debounce } from './util.js';
import {MIN_UNIQUE_PHOTOS_COUNT, MAX_UNIQUE_PHOTOS_COUNT, RERENDER_DELAY} from './data.js';
import {initPictures} from './pictures.js';

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersButtonsElement = imgFiltersElement.querySelectorAll('.img-filters__button');
const imgFiltersDefaultButtonElement = imgFiltersElement.querySelector('#filter-default');
const imgFiltersRandomButtonElement = imgFiltersElement.querySelector('#filter-random');
const imgFiltersDiscussedButtonElement = imgFiltersElement.querySelector('#filter-discussed');

const getDefaultPhotos = (photos) => photos.slice();

const getRandomUniquePhotos = (photos) => {
  const minIndex = MIN_UNIQUE_PHOTOS_COUNT - 1;
  const maxIndex = photos.length - 1;
  const uniquePhotos = [];

  const uniquePhotosIndexs = getRandomUniqueIntegerArray(minIndex, maxIndex);

  for (let i = 0; i < uniquePhotosIndexs.length; i++) {
    uniquePhotos.push(photos[i]);
  }

  return uniquePhotos.slice(MIN_UNIQUE_PHOTOS_COUNT, MAX_UNIQUE_PHOTOS_COUNT + 1);
};

const getDiscussedPhotos = (photos) => {
  const discussedPhoto = photos.slice().sort((currentPhoto, nextPhoto) => nextPhoto.comments.length - currentPhoto.comments.length);
  return discussedPhoto;
};

const changeActiveClass = (evt) => {
  imgFiltersButtonsElement.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');
};

const clearPhotos = () => {
  const pictureElements = document.querySelectorAll('.picture');

  pictureElements.forEach((picture) => {
    picture.remove();
  });
};

const updatePhotos = (photos) => {
  clearPhotos();
  initPictures(photos);
};

const debouncePhotos = debounce(updatePhotos, RERENDER_DELAY);

const applyFilter = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  imgFiltersButtonsElement.forEach((button) => {
    button.addEventListener('click', changeActiveClass);
  });

  imgFiltersDefaultButtonElement.addEventListener('click', () => {
    debouncePhotos(getDefaultPhotos(photos));
  });

  imgFiltersRandomButtonElement.addEventListener('click', () => {
    debouncePhotos(getRandomUniquePhotos(photos));
  });

  imgFiltersDiscussedButtonElement.addEventListener('click', () => {
    debouncePhotos(getDiscussedPhotos(photos));
  });
};

export {applyFilter};
