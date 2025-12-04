const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const bigPhotoImgElement = photoModalElement.querySelector('.big-picture__img img');
const likesCountElement = photoModalElement.querySelector('.likes-count');
const socialCaptionElement = photoModalElement.querySelector('.social__caption');
const commentsListElement = photoModalElement.querySelector('.social__comments');
const commentShownCountElement = photoModalElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = photoModalElement.querySelector('.social__comment-total-count');
const commentCountBlockElement = photoModalElement.querySelector('.social__comment-count');
const commentsLoaderElement = photoModalElement.querySelector('.comments-loader');
const commentTemplate = photoModalElement.querySelector('.social__comment');

const DATA_ELEMENTS = {
  photoModalElement,
  photoModalCloseElement,
  bigPhotoImgElement,
  likesCountElement,
  socialCaptionElement,
  commentsListElement,
  commentShownCountElement,
  commentTotalCountElement,
  commentCountBlockElement,
  commentsLoaderElement,
  commentTemplate
};

export { DATA_ELEMENTS };
