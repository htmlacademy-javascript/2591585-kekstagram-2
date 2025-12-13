const RE_VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;

const photoUploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = photoUploadFormElement.querySelector('.text__hashtags');
const commentInputElement = photoUploadFormElement.querySelector('.text__description');

const pristine = new Pristine(photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const getHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().split(/\s+/).filter((tag) => tag.length > 0);
};

const validateHashtagFormat = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((tag) => RE_VALID_HASHTAG.test(tag));
};

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value).map((t) => t.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
};

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagFormat,
  'Неверный формат хэштега',
  1,
  true
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagUnique,
  'Хэштеги не могут повторяться',
  2,
  true
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagCount,
  `Нельзя добавить больше ${MAX_HASHTAGS} хэштегов`,
  3,
  true
);

const validateCommentLength = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(
  commentInputElement,
  validateCommentLength,
  `Комментарий не может превышать ${MAX_LENGTH_COMMENT} символов`
);

export const isValid = () => pristine.validate();
export const resetValidation = () => pristine.reset();
