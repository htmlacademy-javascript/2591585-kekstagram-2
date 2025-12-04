import { openPhotoModal } from './render-full-size-photo.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoContainer = document.querySelector('.pictures');

let localPhotos;

const renderPhoto = (photoDataArray) => {
  localPhotos = [...photoDataArray];
  const photosFragment = document.createDocumentFragment();

  photoDataArray.forEach((photoData) => {
    const { url, description, likes, comments, id } = photoData;
    const photoElement = photoTemplate.cloneNode(true);

    const photoImageElement = photoElement.querySelector('.picture__img');
    photoImageElement.src = url;
    photoImageElement.alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoElement.dataset.id = id;

    photosFragment.appendChild(photoElement);
  });

  photoContainer.appendChild(photosFragment);
};

photoContainer.addEventListener('click', (evt) => {
  const photoCard = evt.target.closest('.picture');
  if (photoCard) {
    const cardId = Number(photoCard.dataset.id);
    const photo = localPhotos.find((item) => item.id === cardId);
    openPhotoModal(photo);
  }
});

export { renderPhoto };
