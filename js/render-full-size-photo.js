import { isEscapeKey, showModal } from './util.js';
import { photoModalElements } from './photo-modal-elements.js';
import { renderNextComments, closeComments, initComments } from './comments.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function closePhotoModal() {
  showModal(photoModalElements.photoModalElement, false);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeComments();
}

const renderModal = ({ url, description, likes, comments }) => {
  photoModalElements.bigPhotoImgElement.src = url;
  photoModalElements.bigPhotoImgElement.alt = description;
  photoModalElements.likesCountElement.textContent = likes;
  photoModalElements.socialCaptionElement.textContent = description;

  initComments(comments);
};

const openPhotoModal = (photo) => {
  showModal(photoModalElements.photoModalElement);
  renderModal(photo);
  document.addEventListener('keydown', onDocumentKeydown);
};

photoModalElements.photoModalCloseElement.addEventListener('click', closePhotoModal);
photoModalElements.commentsLoaderElement.addEventListener('click', renderNextComments);

export { openPhotoModal, closePhotoModal };
