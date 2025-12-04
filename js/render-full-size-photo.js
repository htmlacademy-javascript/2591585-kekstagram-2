import { isEscapeKey } from './util.js';
import { DATA_ELEMENTS } from './photo-modal-elements.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const showModal = (isShown = true) => {
  if (isShown) {
    DATA_ELEMENTS.photoModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    DATA_ELEMENTS.photoModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newCommentsElement = DATA_ELEMENTS.commentTemplate.cloneNode(true);
    const avatar = newCommentsElement.querySelector('.social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    newCommentsElement.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(newCommentsElement);
  });
  DATA_ELEMENTS.commentsListElement.appendChild(commentsFragment);
};

const renderModal = (({ url, description, likes, comments}) => {
  DATA_ELEMENTS.bigPhotoImgElement.src = url;
  DATA_ELEMENTS.bigPhotoImgElement.alt = description;
  DATA_ELEMENTS.likesCountElement.textContent = likes;
  DATA_ELEMENTS.socialCaptionElement.textContent = description;

  DATA_ELEMENTS.commentsListElement.innerHTML = '';

  DATA_ELEMENTS.commentShownCountElement.textContent = comments.length;
  DATA_ELEMENTS.commentTotalCountElement.textContent = comments.length;
  DATA_ELEMENTS.commentCountBlockElement.classList.add('hidden');
  DATA_ELEMENTS.commentsLoaderElement.classList.add('hidden');

  renderComments(comments);
});

const openPhotoModal = (photo) => {
  showModal();
  renderModal(photo);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhotoModal = () => {
  showModal(false);
  document.removeEventListener('keydown', onDocumentKeydown);
};

DATA_ELEMENTS.photoModalCloseElement.addEventListener('click', () => {
  closePhotoModal();
});

export { openPhotoModal, closePhotoModal };
