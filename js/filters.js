import { getRandomUniqueIntegerArray, debounce } from './util.js';
import {MIN_UNIQUE_PHOTOS_COUNT, MAX_UNIQUE_PHOTOS_COUNT, RERENDER_DELAY} from './data.js';
import {initPictures} from './pictures.js';

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersDefaultButtonElement = imgFiltersElement.querySelector('#filter-default');
const imgFiltersRandomButtonElement = imgFiltersElement.querySelector('#filter-random');
const imgFiltersDiscussedButtonElement = imgFiltersElement.querySelector('#filter-discussed');

const getDefaultPhotos = (photos) => photos.slice();

const getRandomUniquePhotos = (photos) => {
  const minIndex = MIN_UNIQUE_PHOTOS_COUNT - 1;
  const maxIndex = photos.length - 1;

  const uniqueIntegers = getRandomUniqueIntegerArray(minIndex, maxIndex);

  const uniquePhotos = uniqueIntegers
    .map((integer) => {
      const photoIndex = integer;
      return photos[photoIndex];
    })
    .slice(MIN_UNIQUE_PHOTOS_COUNT - 1, MAX_UNIQUE_PHOTOS_COUNT);

  return uniquePhotos;
};

const getDiscussedPhotos = (photos) => {
  const discussedPhoto = photos.slice().sort((currentPhoto, nextPhoto) => nextPhoto.comments.length - currentPhoto.comments.length);
  return discussedPhoto;
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

const changeFilterStyle = (activeFilterName) => {
  if (!imgFiltersElement.querySelector(`#filter-${activeFilterName}`).classList.contains('img-filters__button--active')) {
    imgFiltersElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    imgFiltersElement.querySelector(`#filter-${activeFilterName}`).classList.add('img-filters__button--active');
  }
};

const applyFilter = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  imgFiltersDefaultButtonElement.addEventListener('click', debounce(() => {
    changeFilterStyle('default');
    updatePhotos(getDefaultPhotos(photos));
  }, RERENDER_DELAY));

  imgFiltersRandomButtonElement.addEventListener('click', debounce(() => {
    changeFilterStyle('random');
    updatePhotos(getRandomUniquePhotos(photos));
  }, RERENDER_DELAY));

  imgFiltersDiscussedButtonElement.addEventListener('click', debounce(() => {
    changeFilterStyle('discussed');
    updatePhotos(getDiscussedPhotos(photos));
  }, RERENDER_DELAY));
};

export {applyFilter};
