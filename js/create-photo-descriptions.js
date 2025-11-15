import {
  getRandomInteger,
  createRandomIntegerFromRangeGenerator,
  getRandomArrayElement,
  createIdGenerator
} from './util.js';
import {getDataArrayFromPhotoDescriptions} from './data.js';

const COUNT_PHOTO = 25;
const COUNT_AVATAR = 6;

const SETTINGS = {

  MIN_PHOTO_ID: 1,
  MAX_PHOTO_ID: COUNT_PHOTO,

  MIN_AVATAR_ID: 1,
  MAX_AVATAR_ID: COUNT_AVATAR,

  MIN_COMMENTS: 0,
  MAX_COMMENTS: 30,

  MIN_LIKES: 15,
  MAX_LIKES: 200,

  MIN_SENTENCES: 1,
  MAX_SENTENCES: 2,
};

const {MESSAGES_COMMENTS, NAMES_COMMENTATORS, DESCRIPTIONS} = getDataArrayFromPhotoDescriptions();
const createUniqueIdGenerator = () =>
  createRandomIntegerFromRangeGenerator(SETTINGS.MIN_PHOTO_ID, SETTINGS.MAX_PHOTO_ID);

const getRandomId = createUniqueIdGenerator();
const getRandomPhotoId = createUniqueIdGenerator();
const generateCommentId = createIdGenerator();

const getRandomMessage = () =>
  Array.from({ length: getRandomInteger(SETTINGS.MIN_SENTENCES, SETTINGS.MAX_SENTENCES) }, () => getRandomArrayElement(MESSAGES_COMMENTS)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(SETTINGS.MIN_AVATAR_ID, SETTINGS.MAX_AVATAR_ID)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES_COMMENTATORS),
});

const createPhotoDescription = () => ({
  id: getRandomId(),
  url: `photos/${getRandomPhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(SETTINGS.MIN_LIKES, SETTINGS.MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(SETTINGS.MIN_COMMENTS, SETTINGS.MAX_COMMENTS) },
    createComment
  ),
});


const photosData = Array.from({length: COUNT_PHOTO}, createPhotoDescription);

export { photosData };
