import { isEscapeKey } from './util.js';


const photoModalCloseElement = document.querySelector('.big-picture__cancel');
const photoModalElement = document.querySelector('.big-picture');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const openPhotoModal = (photo) => {
  const bigPhoto = photoModalElement.querySelector('.big-picture__img').querySelector('img');
  bigPhoto.src = photo.url;
  bigPhoto.alt = photo.description;

  photoModalElement.querySelector('.likes-count').textContent = photo.likes;
  photoModalElement.querySelector('.social__caption').textContent = photo.description;

  const commentsList = photoModalElement.querySelector('.social__comments');
  commentsList.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}"
           alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentElement);
  });

  photoModalElement.querySelector('.social__comment-shown-count').textContent = photo.comments.length;
  photoModalElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;

  photoModalElement.querySelector('.social__comment-count').classList.add('hidden');
  photoModalElement.querySelector('.comments-loader').classList.add('hidden');

  photoModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhotoModal = () => {
  photoModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

photoModalCloseElement.addEventListener('click', () => {
  closePhotoModal();
});

export { openPhotoModal, closePhotoModal};
