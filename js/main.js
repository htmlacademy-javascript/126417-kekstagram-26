import {PHOTOS_COUNT} from './data.js';
import {initPicture} from './pictures.js';
import './upload-form.js';

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    initPicture(photos.slice(0, PHOTOS_COUNT));
  });
