import {isEscPressed} from './util.js';

const MAX_HASHTAGS = 5;
const HASHTAG_MINLENGTH = 1;
const HASHTAG_MAXLENGTH = 20;
const DESCRIPTION_LENGTH = 140;
const MIN_IMAGE_SIZE = 25;
const MAX_IMAGE_SIZE = 100;
const IMAGE_SIZE_STEP = 25;

const FilterType = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const FilterCssValue = {
  [FilterType.CHROME]: 'grayscale',
  [FilterType.SEPIA]: 'sepia',
  [FilterType.MARVIN]: 'invert',
  [FilterType.PHOBOS]: 'blur',
  [FilterType.HEAT]: 'brightness',
};

const SliderEffectConfig = {
  [FilterType.CHROME]: {
    start: [1],
    range: {
      'min' : [0],
      'max' : [1],
    },
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  [FilterType.SEPIA]: {
    start: [1],
    range: {
      'min' : [0],
      'max' : [1],
    },
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  [FilterType.MARVIN]: {
    start: [100],
    range: {
      'min' : [0],
      'max' : [100],
    },
    step: 1,
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  [FilterType.PHOBOS]: {
    start: [3],
    range: {
      'min' : [0],
      'max' : [3],
    },
    step: 0.1,
    format: {
      to: function (value) {
        return `${value}px`;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  [FilterType.HEAT]: {
    start: [3],
    range: {
      'min' : [1],
      'max' : [3],
    },
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const imageUploadHashtags = imageUploadForm.querySelector('.text__hashtags');
const imageUploadDescription = imageUploadForm.querySelector('.text__description');
const smallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleSizeField = imageUploadForm.querySelector('.scale__control--value');
const image = imageUploadForm.querySelector('.img-upload__preview img');
const noneEffect = imageUploadForm.querySelector('.effects__radio[value=none]');
const effectsList = imageUploadForm.querySelector('.effects__list');
const sliderDiv = imageUploadForm.querySelector('.effect-level__slider');
const effectValue = imageUploadForm.querySelector('.effect-level__value');

const pristineConfig = {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
};

const pristine = new Pristine(imageUploadForm, pristineConfig);

let currentFilter;

const reg = RegExp(`^#[a-zA-Z]{${HASHTAG_MINLENGTH},${HASHTAG_MAXLENGTH}}$`);

noUiSlider.create(sliderDiv, {
  start: [1],
  range: {
    'min' : [0],
    'max' : [1],
  },
  step: 0.1,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const imageUploadFormCloseHandler = (evt) => {
  if (isEscPressed(evt) || evt.type === 'click') {
    imageUploadForm.reset();
    image.classList = '';
    image.removeAttribute('style');
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageUploadCancelButton.removeEventListener('click', imageUploadFormCloseHandler);
    document.removeEventListener('keydown', imageUploadFormCloseHandler);
  }
};

effectsList.addEventListener('change', (evt) => {
  if (evt.target.closest('.effects__radio')) {
    currentFilter = evt.target.value;
    image.classList = '';
    effectValue.value = '';
    sliderDiv.noUiSlider.reset();
    image.classList.add(`effects__preview--${currentFilter}`);
    if (currentFilter === FilterType.NONE) {
      sliderDiv.classList.add('hidden');
      image.style.filter = 'none';
    } else {
      sliderDiv.classList.remove('hidden');
      sliderDiv.noUiSlider.updateOptions(SliderEffectConfig[currentFilter]);
      image.style.filter = `${FilterCssValue[currentFilter]}(${sliderDiv.noUiSlider.get()})`;
    }
  }
});

sliderDiv.noUiSlider.on('change', () => {
  effectValue.value = sliderDiv.noUiSlider.get();
  image.style.filter = `${FilterCssValue[currentFilter]}(${sliderDiv.noUiSlider.get()})`;
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

const imageSizeHandler = (evt) => {
  let imageSizeValue = +scaleSizeField.value.slice(0, -1);
  if (evt.target === smallerButton && imageSizeValue > MIN_IMAGE_SIZE) {
    imageSizeValue -= IMAGE_SIZE_STEP;
  }
  if (evt.target === biggerButton && imageSizeValue < MAX_IMAGE_SIZE) {
    imageSizeValue += IMAGE_SIZE_STEP;
  }
  scaleSizeField.value = `${imageSizeValue}%`;
  image.style.transform = `scale(${imageSizeValue/100})`;
};

smallerButton.addEventListener('click', (evt) => imageSizeHandler(evt));
biggerButton.addEventListener('click', (evt) => imageSizeHandler(evt));

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
