import {PHOTOS_COUNT} from './data.js';
import {generatePhoto} from './generate-photo.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = generatePhoto(PHOTOS_COUNT);
const pictureListFragment = document.createDocumentFragment();

pictures.forEach((photo) => {
  const {url, description, likes, comments} = photo;
  const comment = comments.forEach((item) => item.message);
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comment;
  pictureListFragment.append(pictureElement);
}
);

pictureListElement.append(pictureListFragment);
