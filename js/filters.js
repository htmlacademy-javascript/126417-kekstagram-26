import {initPicture} from './pictures.js';
import { getRandomUniqueIntegerArray, debounce } from './util.js';
import { MIN_UNIQUE_PHOTOS_COUNT, MAX_UNIQUE_PHOTOS_COUNT, RERENDER_DELAY} from './data.js';

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersDefaultButtonElement = imgFiltersElement.querySelector('#filter-default');
const imgFiltersRandomButtonElement = imgFiltersElement.querySelector('#filter-random');
const imgFiltersDiscussedButtonElement = imgFiltersElement.querySelector('#filter-discussed');

const getDefaultPhotos = (photos) => photos;

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

const getDisscussedPhotos = (photos) => {
  photos.slice().sort((currentPhoto, nextPhoto) => nextPhoto.comments.length - currentPhoto.comments.length);
};

const changeFilter = (activeFilter) => {
  if (!imgFiltersElement.querySelector(`#filter-${activeFilter}`).classList.contains('img-filters__button--active')) {
    imgFiltersElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    imgFiltersElement.querySelector(`#filter-${activeFilter}`).classList.add('img-filters__button--active');
  }
};

const addFilter = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  imgFiltersDefaultButtonElement.addEventListener('click', debounce(() => {
    changeFilter('default');
    initPicture(getDefaultPhotos(photos));
  }, RERENDER_DELAY));

  imgFiltersRandomButtonElement.addEventListener('click', debounce(() => {
    changeFilter('random');
    initPicture(getRandomUniquePhotos(photos));
  }, RERENDER_DELAY));

  imgFiltersRandomButtonElement.addEventListener('click', debounce(() => {
    changeFilter('discussed');
    initPicture(getDisscussedPhotos(photos));
  }, RERENDER_DELAY));
};

export {addFilter};
