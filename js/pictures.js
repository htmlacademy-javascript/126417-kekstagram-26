import {generatePhoto} from './generate-photo.js';
import {PHOTOS_COUNT} from './data.js';

const galleryPhotos = generatePhoto(PHOTOS_COUNT);
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

galleryPhotos.forEach((photo) => {
  const {url, description, likes, comments} = photo;
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureListFragment.append(pictureElement);
}
);

pictureListElement.append(pictureListFragment);

export {galleryPhotos};
