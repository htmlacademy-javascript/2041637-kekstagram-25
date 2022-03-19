import {getRandomOnInterval} from './util.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

const NAMES = [
  'Губка Боб',
  'Дарт Вейдер',
  'Леголас',
  'Баттерс',
  'ЯестьГРУТ'
];

const DESCRIPTIONS = [
  'Похоже на раннего Пикассо',
  'Ван Гог как всегда неподражаем',
  'Одно из редчайших полотен Рембрандта'
];

const NUMBER_OF_IMAGES = 25;


function createComment(commentId) {
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomOnInterval(1, 6)}.svg`,
    message: COMMENTS[getRandomOnInterval(0, COMMENTS.length - 1)],
    name: NAMES[getRandomOnInterval(0, NAMES.length - 1)],
  };
}

function getComments() {
  const comments = [];
  const numberOfComments = getRandomOnInterval(3,16);
  for (let i = 0; i <= numberOfComments - 1; i++) {
    comments[i] = createComment(i + 1);
  }
  return comments;
}

function createImageDescription(imageId) {
  return {
    id: imageId,
    url: `photos/${imageId}.jpg`,
    description: DESCRIPTIONS[getRandomOnInterval(0, DESCRIPTIONS.length - 1)],
    likes: getRandomOnInterval(15, 200),
    comments: getComments(),
  };
}

function getImageDescriptions() {
  const descriptions = [];
  for (let i = 0; i <= NUMBER_OF_IMAGES - 1; i++) {
    descriptions[i] = createImageDescription(i + 1);
  }
  return descriptions;
}

export {getImageDescriptions};


