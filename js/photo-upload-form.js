import { isEscapeKey, showModal } from './util.js';
import { isValid, resetValidation } from './validations.js';
import { resetScalePhoto } from './photo-scale-editor.js';
import { resetEffects } from './photo-effects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './messages.js';

const SUBMIT_TEXT = 'Опубликовать';
const SENDING_TEXT = 'Отправка...';

const photoLoadingElement = document.querySelector('.img-upload__input');
const photoUploadOverlayElement = document.querySelector('.img-upload__overlay');
const photoModalUploadCloseElement = document.querySelector('.img-upload__cancel');
const photoUploadFormElement = document.querySelector('.img-upload__form');

const hashtagsInputElement = photoUploadFormElement.querySelector('.text__hashtags');
const commentInputElement = photoUploadFormElement.querySelector('.text__description');

const submitButton = photoUploadFormElement.querySelector('.img-upload__submit');

const onDocumentKeydown = (evt) => {
  if (document.activeElement === hashtagsInputElement
    || document.activeElement === commentInputElement
    || document.querySelector('.error')
  ) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoUploadModal();
  }
};

function closePhotoUploadModal() {
  showModal(photoUploadOverlayElement, false);
  document.removeEventListener('keydown', onDocumentKeydown);

  photoUploadFormElement.reset();
  resetValidation();
  resetScalePhoto();
  resetEffects();
}

const onCloseButtonClick = (evt) => (evt.preventDefault(), closePhotoUploadModal());

const initPhotoUploadForm = () => {
  photoLoadingElement.addEventListener('change', () => {
    showModal(photoUploadOverlayElement);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  photoModalUploadCloseElement.addEventListener('click', onCloseButtonClick);
};

hashtagsInputElement.addEventListener('keydown', (evt) => evt.stopPropagation());
commentInputElement.addEventListener('keydown', (evt) => evt.stopPropagation());

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SENDING_TEXT : SUBMIT_TEXT;
};

photoUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!isValid()) {
    return;
  }

  toggleSubmitButton(true);

  sendData(new FormData(photoUploadFormElement))
    .then(() => {
      closePhotoUploadModal();
      showSuccess();
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      toggleSubmitButton(false);
    });
});


export { initPhotoUploadForm };
