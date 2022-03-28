const ESC_KEYCODE = 27;
const ALERT_SHOW_TIME = 5000;

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
checkStringLength('fdsfasf', 9);

const showAlert = (alert) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#8A8A82';
  alertContainer.style.color = '#232321';

  alertContainer.textContent = alert;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomOnInterval, isEscPressed, showAlert};
