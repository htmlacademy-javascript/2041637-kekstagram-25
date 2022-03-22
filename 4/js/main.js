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

function getRandomOnInterval (num1, num2) {
  if (num1 >= num2) {
    const num3 = num1;
    num1 = num2;
    num2 = num3;
  }
  return num1 === num2 ? num1 : Math.floor(Math.random()*(num2 - num1 + 1)) + num1;
}

function checkStingLength (string, maxLength) {
  return (string.length <= maxLength);
}

// eslint-disable-next-line no-console
console.log(checkStingLength('1412424131', 15));

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
  const numberOfComments = getRandomOnInterval(3,6);
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

// eslint-disable-next-line no-console
console.log(getImageDescriptions());
