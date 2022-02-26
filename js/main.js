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

let DESCRIPTIONS = [
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

function createIdArray(size) {
  const arrId = Array.from({length: size}, (_, i) => i + 1);
  return arrId;
}

function getId(array) {
  let arrId = array;
  let randomIndex = getRandomOnInterval(0, arrId.length-1);
  let id = arrId[randomIndex];
  arrId.splice(randomIndex, 1);
  return id;
}

function createComment(commentId) {
  let comment = {
    id: commentId,
    avatar: 'img/avatar-' + getRandomOnInterval(1, 6) + '.svg',
    message: COMMENTS[getRandomOnInterval(0, COMMENTS.length - 1)],
    name: NAMES[getRandomOnInterval(0, NAMES.length - 1)],
  }
  return comment;
}

function getComments() {
  let comments = [];
  let numberOfComments = getRandomOnInterval(3,6);
  let commentsIdArray = createIdArray(numberOfComments);
  for (let i = 0; i <= numberOfComments - 1; i++) {
    let commentId = getId(commentsIdArray);
    comments[i] = createComment(commentId);
  }
  return comments;
}

function createImageDescription(imageId) {
   let imageData = {
    id: imageId,
    url: 'photos/' + imageId + '.jpg',
    description: DESCRIPTIONS[getRandomOnInterval(0, DESCRIPTIONS.length - 1)],
    likes: getRandomOnInterval(15, 200),
    comments: getComments(),
  };
  return imageData;
}

function getImageDescriptions() {
  let descriptions = [];
  let numberOfImages = 25;
  let imagesIdArray = createIdArray(numberOfImages);
  for (let i = 0; i <= numberOfImages - 1; i++) {
    let imageId = getId(imagesIdArray);
    descriptions[i] = createImageDescription(imageId);
  }
  return descriptions;
}

console.log(getImageDescriptions());

