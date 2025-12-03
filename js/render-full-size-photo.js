import { isEscapeKey } from './util.js';
import {
  photoModalElement,
  photoModalCloseElement,
  bigPhotoImg,
  likesCount,
  socialCaption,
  commentsList,
  commentShownCount,
  commentTotalCount,
  commentCountBlock,
  commentsLoader
} from './photo-modal-elements.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const openPhotoModal = (photo) => {
  bigPhotoImg.src = photo.url;
  bigPhotoImg.alt = photo.description;

  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

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

  commentShownCount.textContent = photo.comments.length;
  commentTotalCount.textContent = photo.comments.length;

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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

export { openPhotoModal, closePhotoModal };
