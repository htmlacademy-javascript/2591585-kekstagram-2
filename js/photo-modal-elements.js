const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const bigPhotoImg = photoModalElement.querySelector('.big-picture__img img');
const likesCount = photoModalElement.querySelector('.likes-count');
const socialCaption = photoModalElement.querySelector('.social__caption');
const commentsList = photoModalElement.querySelector('.social__comments');
const commentShownCount = photoModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = photoModalElement.querySelector('.social__comment-total-count');
const commentCountBlock = photoModalElement.querySelector('.social__comment-count');
const commentsLoader = photoModalElement.querySelector('.comments-loader');

export {
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
};
