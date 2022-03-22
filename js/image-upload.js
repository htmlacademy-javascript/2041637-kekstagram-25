import {isEscPressed} from './util.js';

const MAX_HASHTAGS = 5;
const HASHTAG_MINLENGTH = 1;
const HASHTAG_MAXLENGTH = 20;
const DESCRIPTION_LENGTH = 140;

const pristineConfig = {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const imageUploadHashtags = imageUploadForm.querySelector('.text__hashtags');
const imageUploadDescription = imageUploadForm.querySelector('.text__description');
const pristine = new Pristine(imageUploadForm, pristineConfig);
const reg = RegExp(`^#[a-zA-Z]{${HASHTAG_MINLENGTH},${HASHTAG_MAXLENGTH}}$`);
const smallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleSizeField = imageUploadForm.querySelector('.scale__control--value');
const image = imageUploadForm.querySelector('.img-upload__preview').querySelector('img');
const noneEffect = imageUploadForm.querySelector('.effects__radio[value=none]');
const effectsList = imageUploadForm.querySelector('.effects__list');
const sliderDiv = imageUploadForm.querySelector('.effect-level__slider');
const effectValue = imageUploadForm.querySelector('.effect-level__value');

let filter;
const filterName = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blue',
  heat: 'brightness',
};

noUiSlider.create(sliderDiv, {
  start: [1],
  range: {
    'min' : [0],
    'max' : [1],
  },
  step: 0.1,
});

const imageUploadFormCloseHandler = (evt) => {
  if (isEscPressed(evt) || evt.type === 'click') {
    imageUploadForm.reset();
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageUploadCancelButton.removeEventListener('click', imageUploadFormCloseHandler);
    document.removeEventListener('keydown', imageUploadFormCloseHandler);
  }
};

effectsList.addEventListener('change', (evt) => {
  if (evt.target.closest('.effects__radio')) {
    image.classList = '';
    sliderDiv.noUiSlider.reset();
    image.style.filter = 'none';
    effectValue.value = '';
    image.classList.add(`effects__preview--${evt.target.value}`);
    filter = evt.target.value;
    image.setAttribute('style', `filter:${filterName[filter]}(${sliderDiv.noUiSlider.get()})`);
    // eslint-disable-next-line no-unused-expressions
    evt.target.value === 'none' ? sliderDiv.classList.add('hidden') : sliderDiv.classList.remove('hidden');
    if (evt.target.value === 'chrome' || evt.target.value === 'sepia') {
      sliderDiv.noUiSlider.updateOptions({
        range: {
          'min': [0],
          'max': [1],
        },
        step: 0.1,
        start: 1,
      });
    }
    if (evt.target.value === 'marvin') {
      sliderDiv.noUiSlider.updateOptions({
        range: {
          'min': [0],
          'max': [100],
        },
        step: 1,
        start: 100,
        format: {
          to: function (value) {
            return `${value}%`;
          }
        }
      });
    }
    if (evt.target.value === 'phobos') {
      sliderDiv.noUiSlider.updateOptions({
        range: {
          'min': [0],
          'max': [3],
        },
        step: 0.1,
        start: 3,
        format: {
          to: function (value) {
            return `${value}px`;
          }
        }
      });
    }
    if (evt.target.value === 'heat') {
      sliderDiv.noUiSlider.updateOptions({
        range: {
          'min': [1],
          'max': [3],
        },
        start: 3,
        step: 0.1,
      });
    }
  }
});

sliderDiv.noUiSlider.on('change', () => {
  effectValue.value = sliderDiv.noUiSlider.get();
  image.setAttribute('style', `filter:${filterName[filter]}(${sliderDiv.noUiSlider.get()})`);
});

imageUploadInput.addEventListener('change', (evt) => {
  if (evt.target.value) {
    scaleSizeField.value = '100%';
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (noneEffect.checked) {
      sliderDiv.classList.add('hidden');
    }
    document.addEventListener('keydown', imageUploadFormCloseHandler);
    imageUploadCancelButton.addEventListener('click', imageUploadFormCloseHandler);
  }
});

smallerButton.addEventListener('click', () => {
  let imageSizeValue = +scaleSizeField.value.slice(0, -1);
  if (imageSizeValue > 25) {
    imageSizeValue -= 25;
  }
  scaleSizeField.value = `${imageSizeValue}%`;
  image.style.transform = `scale(${imageSizeValue/100})`;
});

biggerButton.addEventListener('click', () => {
  let imageSizeValue = +scaleSizeField.value.slice(0, -1);
  if (imageSizeValue < 100) {
    imageSizeValue += 25;
  }
  scaleSizeField.value = `${imageSizeValue}%`;
  image.style.transform = `scale(${imageSizeValue/100})`;
});

pristine.addValidator(imageUploadHashtags, (value) => {
  if (!value) {
    return true;
  }
  const hashtagArr = value.split(' ');
  return hashtagArr.every((elem) => reg.test(elem));
}, 'Хэштег должен начинаться с # и быть длиной от 1 до 20 символов, содержать только латинские буквы');

pristine.addValidator(imageUploadHashtags, (value) => {
  if (!value) {
    return true;
  }
  const hashtagArr = value.split(' ');
  const uniqueHashtagArr = [];
  return (hashtagArr.every((elem) => {
    const elemLowCase = elem.toLowerCase();
    if (uniqueHashtagArr.includes(elemLowCase)) {
      return false;
    }
    uniqueHashtagArr.push(elemLowCase);
    return true;
  }));
}, 'Хэштег не должен повторяться');

pristine.addValidator(imageUploadHashtags, (value) => {
  if (!value) {
    return true;
  }
  const hashtagArr = value.split(' ');
  return hashtagArr.length <= MAX_HASHTAGS;
}, 'Хэштегов не должно быть больше пяти');

pristine.addValidator(imageUploadDescription, (value) => value.length <= DESCRIPTION_LENGTH, 'Текст комментария должен быть не более 140 символов');

imageUploadDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

imageUploadHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
});
