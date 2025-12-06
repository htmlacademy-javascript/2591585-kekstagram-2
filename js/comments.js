import { DATA_ELEMENTS } from './photo-modal-elements.js';

const COMMENTS_PER_ITERATION = 5;

let currentPhotoComments = [];
let shownCommentsCount = 0;

const renderNextComments = () => {
  const nextIterationOfComment = currentPhotoComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_ITERATION);

  shownCommentsCount += nextIterationOfComment.length;

  const commentsFragment = document.createDocumentFragment();

  nextIterationOfComment.forEach((comment) => {
    const newCommentsElement = DATA_ELEMENTS.commentTemplate.cloneNode(true);
    const avatar = newCommentsElement.querySelector('.social__picture');

    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    newCommentsElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(newCommentsElement);
  });

  DATA_ELEMENTS.commentsListElement.appendChild(commentsFragment);

  DATA_ELEMENTS.commentShownCountElement.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentPhotoComments.length) {
    DATA_ELEMENTS.commentsLoaderElement.classList.add('hidden');
  }
};

const closeComments = () => {
  shownCommentsCount = 0;
  currentPhotoComments = [];

  DATA_ELEMENTS.commentsListElement.innerHTML = '';
  DATA_ELEMENTS.commentsLoaderElement.classList.add('hidden');

  DATA_ELEMENTS.commentShownCountElement.textContent = '0';
};


const renderModal = ({ url, description, likes, comments }) => {
  DATA_ELEMENTS.bigPhotoImgElement.src = url;
  DATA_ELEMENTS.bigPhotoImgElement.alt = description;
  DATA_ELEMENTS.likesCountElement.textContent = likes;
  DATA_ELEMENTS.socialCaptionElement.textContent = description;

  closeComments();
  currentPhotoComments = comments;
  DATA_ELEMENTS.commentTotalCountElement.textContent = comments.length;
  DATA_ELEMENTS.commentCountBlockElement.classList.remove('hidden');
  DATA_ELEMENTS.commentsLoaderElement.classList.remove('hidden');

  renderNextComments();
};

const initComments = (comments) => {
  closeComments();
  currentPhotoComments = comments;

  DATA_ELEMENTS.commentTotalCountElement.textContent = comments.length;
  DATA_ELEMENTS.commentCountBlockElement.classList.remove('hidden');
  DATA_ELEMENTS.commentsLoaderElement.classList.remove('hidden');

  renderNextComments();
};

export {
  renderNextComments,
  closeComments,
  initComments,
  currentPhotoComments,
  shownCommentsCount
};
