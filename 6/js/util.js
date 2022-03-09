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

export {getRandomOnInterval};
