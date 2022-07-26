import { PHOTOS_COUNT } from './data.js';
import { getData } from './api.js';
import {initPictures} from './pictures.js';
import {applyFilter} from './filters.js';
import { showAlert } from './util.js';
import {setUserModalSubmit} from './user-modal.js';


getData(
  (photos) => {
    initPictures(photos.slice(0, PHOTOS_COUNT));
    applyFilter(photos);
  },
  (message) => {
    showAlert(message);
  }
);

setUserModalSubmit();

