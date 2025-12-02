import { openPhotoModal } from './render-full-size-photo.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoContainer = document.querySelector('.pictures');

const renderPhoto = (photoDataArray) => {
  const photosFragment = document.createDocumentFragment();

  photoDataArray.forEach((photoData) => {
    const { url, description, likes, comments } = photoData;
    const photoElement = photoTemplate.cloneNode(true);

    const photoImageElement = photoElement.querySelector('.picture__img');
    photoImageElement.src = url;
    photoImageElement.alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhotoModal(photoData);
    });

    photosFragment.appendChild(photoElement);
  });

  photoContainer.appendChild(photosFragment);
};

export { renderPhoto };
