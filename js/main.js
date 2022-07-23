import {PHOTOS_COUNT} from './data.js';
import { getData } from './api.js';
import {initPicture} from './pictures.js';
import { showAlert } from './util.js';
import {setUserModalSubmit} from './user-modal.js';

getData(
  (photos) => {
    initPicture(photos.slice(0, PHOTOS_COUNT));
  },
  (message) => {
    showAlert(message);
  }
);

setUserModalSubmit();
