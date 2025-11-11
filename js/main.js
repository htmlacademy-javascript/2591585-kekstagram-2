const MESSAGES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES_COMMENTATORS = [
  'Ира',
  'Аня',
  'Кирилл',
  'Нина',
  'Дима',
  'Маша',
  'Алексей',
  'Соня',
  'Игорь',
  'Катя',
  'Вика',
  'Даня',
  'Саша',
  'Настя',
  'Максим'
];

const DESCRIPTIONS = [
  'Случайный кадр, но любимый.',
  'Сохраняю в памяти (и в ленте).',
  'Просто пусть будет здесь.',
  'Иногда ничего не нужно добавлять.',
  'Немного о том, что делает меня счастливее.'
];

const COUNT_PHOTO = 25;
const COUNT_AVATAR = 6;
const MAX_COMMENTS = 30;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIntegerFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) =>
  elements.length
    ? elements[getRandomInteger(0, elements.length - 1)]
    : undefined;

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

const createUniqueIdGenerator = () =>
  createRandomIntegerFromRangeGenerator(1, COUNT_PHOTO);

const getRandomId = createUniqueIdGenerator();
const getRandomPhotoId = createUniqueIdGenerator();
const generateCommentId = createIdGenerator();

const getRandomMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGES_COMMENTS)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATAR)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES_COMMENTATORS),
});

const createPhotoDescription = () => ({
  id: getRandomId(),
  url: `photos/${getRandomPhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from(
    { length: getRandomInteger(0, MAX_COMMENTS) },
    createComment
  ),
});


const similarPhotoDescription = Array.from({length: COUNT_PHOTO}, createPhotoDescription);
//console.log (similarPhotoDescription);

