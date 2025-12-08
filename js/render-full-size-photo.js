import { isEscapeKey } from './util.js';
import { DATA_ELEMENTS } from './photo-modal-elements.js';
import { renderNextComments, closeComments, initComments } from './comments.js';

const showModal = (isShown = true) => {
  if (isShown) {
    DATA_ELEMENTS.photoModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    return;
  }

  DATA_ELEMENTS.photoModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
}

function closePhotoModal() {
  showModal(false);
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
  showModal();
  renderModal(photo);
  document.addEventListener('keydown', onDocumentKeydown);
};

DATA_ELEMENTS.photoModalCloseElement.addEventListener('click', closePhotoModal);
DATA_ELEMENTS.commentsLoaderElement.addEventListener('click', renderNextComments);

export { openPhotoModal, closePhotoModal };
