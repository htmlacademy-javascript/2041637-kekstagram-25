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

function createIdArray(size) {
  const arrId = Array.from({length: size}, (_, i) => i + 1);
  return arrId;
}

function getId(array) {
  const arrId = array;
  const randomIndex = getRandomOnInterval(0, arrId.length-1);
  const id = arrId[randomIndex];
  arrId.splice(randomIndex, 1);
  return id;
}

function createComment(commentId) {
  const comment = {
    id: commentId,
    avatar: `img/avatar-${  getRandomOnInterval(1, 6)  }.svg`,
    message: COMMENTS[getRandomOnInterval(0, COMMENTS.length - 1)],
    name: NAMES[getRandomOnInterval(0, NAMES.length - 1)],
  };
  return comment;
}

function getComments() {
  const comments = [];
  const numberOfComments = getRandomOnInterval(3,6);
  const commentsIdArray = createIdArray(numberOfComments);
  for (let i = 0; i <= numberOfComments - 1; i++) {
    const commentId = getId(commentsIdArray);
    comments[i] = createComment(commentId);
  }
  return comments;
}

function createImageDescription(imageId) {
  const imageData = {
    id: imageId,
    url: `photos/${  imageId  }.jpg`,
    description: DESCRIPTIONS[getRandomOnInterval(0, DESCRIPTIONS.length - 1)],
    likes: getRandomOnInterval(15, 200),
    comments: getComments(),
  };
  return imageData;
}

function getImageDescriptions() {
  const descriptions = [];
  const numberOfImages = 25;
  const imagesIdArray = createIdArray(numberOfImages);
  for (let i = 0; i <= numberOfImages - 1; i++) {
    const imageId = getId(imagesIdArray);
    descriptions[i] = createImageDescription(imageId);
  }
  return descriptions;
}

// eslint-disable-next-line no-console
console.log(getImageDescriptions());

