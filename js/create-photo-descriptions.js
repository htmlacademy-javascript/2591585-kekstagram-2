import {
  getRandomInteger,
  createRandomIntegerFromRangeGenerator,
  getRandomArrayElement,
  createIdGenerator
} from './util.js';
import {MESSAGES_COMMENTS, NAMES_COMMENTATORS, DESCRIPTIONS, DATA_GENERATION_SETTINGS} from './data.js';

const createUniqueIdGenerator = () =>
  createRandomIntegerFromRangeGenerator(DATA_GENERATION_SETTINGS.MIN_PHOTO_ID, DATA_GENERATION_SETTINGS.MAX_PHOTO_ID);

const getRandomId = createUniqueIdGenerator();
const getRandomPhotoId = createUniqueIdGenerator();
const generateCommentId = createIdGenerator();

const getRandomMessage = () =>
  Array.from({ length: getRandomInteger(DATA_GENERATION_SETTINGS.MIN_SENTENCES, DATA_GENERATION_SETTINGS.MAX_SENTENCES) }, () => getRandomArrayElement(MESSAGES_COMMENTS)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(DATA_GENERATION_SETTINGS.MIN_AVATAR_ID, DATA_GENERATION_SETTINGS.MAX_AVATAR_ID)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES_COMMENTATORS),
});

const createPhotoDescription = () => ({
  id: getRandomId(),
  url: `photos/${getRandomPhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(DATA_GENERATION_SETTINGS.MIN_LIKES, DATA_GENERATION_SETTINGS.MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(DATA_GENERATION_SETTINGS.MIN_COMMENTS, DATA_GENERATION_SETTINGS.MAX_COMMENTS) },
    createComment
  ),
});


const photosData = Array.from({length: DATA_GENERATION_SETTINGS.MAX_PHOTO_ID}, createPhotoDescription);

export { photosData };
