const ESC_KEYCODE = 27;

const isEscPressed = (evt) => evt.keyCode === ESC_KEYCODE;

const getRandomOnInterval = (num1, num2) => {
  if (num1 >= num2) {
    const num3 = num1;
    num1 = num2;
    num2 = num3;
  }
  return num1 === num2 ? num1 : Math.floor(Math.random()*(num2 - num1 + 1)) + num1;
};

const checkStringLength = (string, maxLength) => (string.length <= maxLength);

// eslint-disable-next-line no-console
console.log(checkStringLength('1412424131', 15));

export {getRandomOnInterval};
export {isEscPressed};