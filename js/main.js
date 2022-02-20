// подсмотрено на https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomOnInterval (num1, num2) {
/*  num1 = Math.round(num1);
  num2 = Math.round(num2);*/
  if (num1 >= num2) {
    const num3 = num1;
    num1 = num2;
    num2 = num3;
  }
  return num1 === num2 ? num1 : Math.floor(Math.random()*(num2 - num1 + 1)) + num1;
}

// eslint-disable-next-line no-console
console.log(getRandomOnInterval(4,4));

function checkStingLength (string, maxLength) {
  /*const stringLength = string.toString().length;*/
  return (string.length <= maxLength);
}

// eslint-disable-next-line no-console
console.log(checkStingLength('3551234', 6));
