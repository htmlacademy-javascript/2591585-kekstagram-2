import { isEscapeKey, showModal } from './util.js';
import { isValid, resetValidation } from './validations.js';
import { onZoomOutClick, onZoomClick, resetScalePhoto } from './photo-scale-editor.js';
import { onEffectChange, resetEffects } from './photo-effects.js';

const photoLoadingElement = document.querySelector('.img-upload__input');
const photoUploadOverlayElement = document.querySelector('.img-upload__overlay');
const photoModalUploadCloseElement = document.querySelector('.img-upload__cancel');
const photoUploadFormElement = document.querySelector('.img-upload__form');

const hashtagsInputElement = photoUploadFormElement.querySelector('.text__hashtags');
const commentInputElement = photoUploadFormElement.querySelector('.text__description');

const photoZoomOutElement = photoUploadFormElement.querySelector('.scale__control--smaller');
const photoZoomElement = photoUploadFormElement.querySelector('.scale__control--bigger');

const effectsListElement = photoUploadFormElement.querySelector('.effects__list');

const onDocumentKeydown = (evt) => {
  if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoUploadModal();
  }
};

function closePhotoUploadModal () {
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

photoUploadFormElement.addEventListener('submit', (evt) => !isValid() && evt.preventDefault());

photoZoomOutElement.addEventListener('click', onZoomOutClick);
photoZoomElement.addEventListener('click', onZoomClick);

effectsListElement.addEventListener('change', onEffectChange);

export { initPhotoUploadForm };
