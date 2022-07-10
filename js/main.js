import {generatePhoto} from './generate-photo.js';
import {PHOTOS_COUNT} from './data.js';
import {initPicture} from './pictures.js';
import './userForm.js';
generatePhoto(PHOTOS_COUNT);
initPicture(generatePhoto(PHOTOS_COUNT));
