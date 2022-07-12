import {generatePhoto} from './generate-photo.js';
import {PHOTOS_COUNT} from './data.js';
import {initPicture} from './pictures.js';
import './upload.js';
import {changeScale} from './scale-photo.js';
import {onFormChange} from './effect-photo.js';

changeScale();
onFormChange();
generatePhoto(PHOTOS_COUNT);
initPicture(generatePhoto(PHOTOS_COUNT));

