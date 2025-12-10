import { isEscapeKey } from './util.js';

const photoLoadingElement = document.querySelector('.img-upload__input');
const photoeUploadFormElement = document.querySelector('.img-upload__overlay');
const photoModalUploadCloseElement = document.querySelector('.img-upload__cancel');
const photoFormUploadElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = photoFormUploadElement.querySelector('.text__hashtags');
const commentInputElement = photoFormUploadElement.querySelector('.text__description');

const RE_VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;

const showModal = (isShown = true) => {
  if (isShown) {
    photoeUploadFormElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    return;
  }

  photoeUploadFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoUploadModal();
  }
}

function closePhotoUploadModal() {
  showModal(false);
  document.removeEventListener('keydown', onDocumentKeydown);

  photoeUploadFormElement.reset();
  photoLoadingElement.value = '';
}

const initPhotoUploadForm = () => {
  photoLoadingElement.addEventListener('change', () => {
    showModal();
    document.addEventListener('keydown', onDocumentKeydown);
  });

  photoModalUploadCloseElement.addEventListener('click', closePhotoUploadModal);
};
/*------------------------Валидация------------------------------------------- */
const pristine = new Pristine(photoFormUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

function getHashtags(value) {
  if (!value.trim()) {
    return [];
  }
  return value.trim().split(/\s+/).filter((tag) => tag.length > 0);
}

function validateHashtagFormat(value) {
  const hashtags = getHashtags(value);
  return hashtags.every((tag) => RE_VALID_HASHTAG.test(tag));
}

function validateHashtagUnique(value) {
  const hashtags = getHashtags(value).map((t) => t.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
}

function validateHashtagCount(value) {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
}

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagFormat,
  'Неверный формат хэштега'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagUnique,
  'Хэштеги не могут повторяться'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagCount,
  'Нельзя добавить больше 5 хэштегов'
);

function validateCommentLength(value) {
  return value.length <= 140;
}

pristine.addValidator(
  commentInputElement,
  validateCommentLength,
  'Комментарий не может превышать 140 символов'
);

hashtagsInputElement.addEventListener('keydown', (evt) => evt.stopPropagation());
commentInputElement.addEventListener('keydown', (evt) => evt.stopPropagation());

photoFormUploadElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

/*------------------------Валидация------------------------------------------- */

export { initPhotoUploadForm };
