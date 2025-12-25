import { photoModalElements } from './photo-modal-elements.js';

const COMMENTS_PER_ITERATION = 5;

let currentPhotoComments = [];
let shownCommentsCount = 0;

const renderNextComments = () => {
  const nextIterationOfComment = currentPhotoComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_ITERATION);

  shownCommentsCount += nextIterationOfComment.length;

  const commentsFragment = document.createDocumentFragment();

  nextIterationOfComment.forEach((comment) => {
    const newCommentsElement = photoModalElements.commentTemplate.cloneNode(true);
    const avatar = newCommentsElement.querySelector('.social__picture');

    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    newCommentsElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(newCommentsElement);
  });

  photoModalElements.commentsListElement.appendChild(commentsFragment);

  photoModalElements.commentShownCountElement.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentPhotoComments.length) {
    photoModalElements.commentsLoaderElement.classList.add('hidden');
  }
};

const closeComments = () => {
  shownCommentsCount = 0;
  currentPhotoComments = [];

  photoModalElements.commentsListElement.innerHTML = '';
  photoModalElements.commentsLoaderElement.classList.add('hidden');

  photoModalElements.commentShownCountElement.textContent = '0';
};


const initComments = (comments) => {
  closeComments();
  currentPhotoComments = comments;

  photoModalElements.commentTotalCountElement.textContent = comments.length;
  photoModalElements.commentCountBlockElement.classList.remove('hidden');
  photoModalElements.commentsLoaderElement.classList.remove('hidden');

  renderNextComments();
};

export {
  renderNextComments,
  closeComments,
  initComments
};
