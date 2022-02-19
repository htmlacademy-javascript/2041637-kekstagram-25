// подсмотрено на https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round
function getRandomOnInterval (num1, num2) {
  num1 = Math.round(num1);
  num2 = Math.round(num2);
  return Math.floor(Math.random()*(num2 - num1 + 1) + num1);
}

// eslint-disable-next-line no-console
console.log(getRandomOnInterval(3.49,7.5));

function checkStingLength (string, maxLength) {
  const stringLength = string.toString().length;
  return (stringLength <= maxLength);
}

// eslint-disable-next-line no-console
console.log(checkStingLength(3551234, 6));
