import {isEscPressed} from './util.js';
import {sendData} from './data.js';

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

const filterCssValue = {
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
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
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
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const successModal = document.querySelector('#success').content;
const errorModal = document.querySelector('#error').content;
const slider = document.querySelector('.img-upload__effect-level');
const imageInputsContainer = imageUploadForm.querySelector('.img-upload__text');
let pristineErrorContainer;

const pristine = new Pristine(imageUploadForm);

let currentFilter;

const reg = RegExp(`^#[a-zA-Z0-9]{${HASHTAG_MINLENGTH},${HASHTAG_MAXLENGTH}}$`);

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

const addPristineErrorContainer = () => {
  pristineErrorContainer = document.createElement('div');
  pristineErrorContainer.classList.add('prisine-container');
  imageInputsContainer.appendChild(pristineErrorContainer);
};

const imageUploadFormCloseHandler = (evt) => {
  if (isEscPressed(evt) || evt.type === 'click' || evt.target === imageUploadForm) {
    imageUploadForm.reset();
    image.classList = '';
    image.removeAttribute('style');
    if (pristineErrorContainer) {
      pristineErrorContainer.innerHTML = '';
    }
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
      slider.classList.add('hidden');
      image.style.filter = 'none';
    } else {
      slider.classList.remove('hidden');
      sliderDiv.classList.remove('hidden');
      sliderDiv.noUiSlider.updateOptions(SliderEffectConfig[currentFilter]);
      image.style.filter = `${filterCssValue[currentFilter]}(${sliderDiv.noUiSlider.get()})`;
    }
  }
});

sliderDiv.noUiSlider.on('change', () => {
  effectValue.value = sliderDiv.noUiSlider.get();
  image.style.filter = `${filterCssValue[currentFilter]}(${sliderDiv.noUiSlider.get()})`;
});

imageUploadInput.addEventListener('change', (evt) => {
  if (evt.target.value) {
    const file = imageUploadInput.files[0];
    imageUploadPreview.src = URL.createObjectURL(file);
    scaleSizeField.value = '100%';
    addPristineErrorContainer();
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (noneEffect.checked) {
      slider.classList.add('hidden');
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

pristine.addValidator(imageUploadDescription, (value) => value.length <= DESCRIPTION_LENGTH, 'Текст комментария должен быть не более 140 символов');

pristine.addValidator(imageUploadHashtags, (value) => {
  if (!value) {
    return true;
  }
  value = value.replace(/\s\s+/g, ' ');
  value = value.replace(/^\s+|\s+$/g, '');
  const hashtagArr = value.split(' ');
  return hashtagArr.every((elem) => reg.test(elem));
}, 'Хэштег должен начинаться с # и быть длиной от 1 до 20 символов, содержать только латинские буквы и цифры');

pristine.addValidator(imageUploadHashtags, (value) => {
  if (!value) {
    return true;
  }
  value = value.replace(/\s\s+/g, ' ');
  value = value.replace(/^\s+|\s+$/g, '');
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
  value = value.replace(/\s\s+/g, ' ');
  value = value.replace(/^\s+|\s+$/g, '');
  const hashtagArr = value.split(' ');
  return hashtagArr.length <= MAX_HASHTAGS;
}, 'Хэштегов не должно быть больше пяти');

imageUploadDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

imageUploadHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const showSuccessModal = () => {
  const successModalClone = successModal.cloneNode(true);
  const successButton = successModalClone.querySelector('.success__button');
  const success = successModalClone.querySelector('.success');
  successButton.addEventListener('click', () => {
    success.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscPressed(evt)) {
      success.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === success) {
      success.remove();
    }
  });
  document.body.classList.add('modal-open');
  document.body.appendChild(successModalClone);
};

const showErrorModal = () => {
  const errorModalClone = errorModal.cloneNode(true);
  const errorButton = errorModalClone.querySelector('.error__button');
  const error = errorModalClone.querySelector('.error');
  errorButton.addEventListener('click', () => {
    error.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscPressed(evt)) {
      error.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target === error) {
      error.remove();
    }
  });
  document.body.classList.add('modal-open');
  document.body.appendChild(errorModalClone);
};

imageUploadForm.addEventListener('submit', (evt) => {
  pristineErrorContainer.innerHTML = '';
  evt.preventDefault();
  pristine.validate();
  const errorsByInputType = pristine.getErrors();
  errorsByInputType.forEach((errorType) => {
    errorType.errors.forEach((error) => {
      pristineErrorContainer.innerHTML += `${error}<br>`;
    });
  });
  if (errorsByInputType.length === 0) {
    blockSubmitButton();
    sendData(
      () => {
        unblockSubmitButton();
        imageUploadFormCloseHandler(evt);
        showSuccessModal();
      },
      () => {
        unblockSubmitButton();
        imageUploadFormCloseHandler(evt);
        showErrorModal();
      },
      new FormData(evt.target));
  }
});
