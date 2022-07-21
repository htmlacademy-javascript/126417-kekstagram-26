import {generatePhoto} from './generate-photo.js';
import {PHOTOS_COUNT} from './data.js';
import {initPicture} from './pictures.js';
import './upload.js';

generatePhoto(PHOTOS_COUNT);
initPicture(generatePhoto(PHOTOS_COUNT));

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos);
  });
