import { isEscapeKey, showModal } from './util.js';
import { DATA_ELEMENTS } from './photo-modal-elements.js';
import { renderNextComments, closeComments, initComments } from './comments.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function closePhotoModal() {
  showModal(DATA_ELEMENTS.photoModalElement, false);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeComments();
}

const renderModal = ({ url, description, likes, comments }) => {
  DATA_ELEMENTS.bigPhotoImgElement.src = url;
  DATA_ELEMENTS.bigPhotoImgElement.alt = description;
  DATA_ELEMENTS.likesCountElement.textContent = likes;
  DATA_ELEMENTS.socialCaptionElement.textContent = description;

  initComments(comments);
};

const openPhotoModal = (photo) => {
  showModal(DATA_ELEMENTS.photoModalElement);
  renderModal(photo);
  document.addEventListener('keydown', onDocumentKeydown);
};

DATA_ELEMENTS.photoModalCloseElement.addEventListener('click', closePhotoModal);
DATA_ELEMENTS.commentsLoaderElement.addEventListener('click', renderNextComments);

export { openPhotoModal, closePhotoModal };
