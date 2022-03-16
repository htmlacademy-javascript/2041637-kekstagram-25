import {isEscPressed} from './util.js';

const MAX_HASHTAGS = 5;
const HASHTAG_MINLENGTH = 1;
const HASHTAG_MAXLENGTH = 20;
const DESCRIPTION_LENGTH = 140;

const validationConfig = {
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
const pristine = new Pristine(imageUploadForm, validationConfig);


const imageUploadFormCloseHandler = (evt) => {
  if (isEscPressed(evt) || evt.type === 'click') {
    imageUploadForm.reset();
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageUploadCancelButton.removeEventListener('click', imageUploadFormCloseHandler);
    document.removeEventListener('keydown', imageUploadFormCloseHandler);
  }
};


imageUploadInput.addEventListener('change', (evt) => {
  if (evt.target.value) {
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', imageUploadFormCloseHandler);
    imageUploadCancelButton.addEventListener('click', imageUploadFormCloseHandler);
  }
});


pristine.addValidator(imageUploadHashtags, (value) => {
  const hashtagArr = value.split(' ');
  const reg = RegExp(`^#[a-z]{${HASHTAG_MINLENGTH},${HASHTAG_MAXLENGTH}}$`);
  for (let i = 0; i < hashtagArr.length; i++) {
    if (reg.test(hashtagArr[i]) === false) {
      return false;
    }
  }
  return true;
}, 'Хэштег должен начинаться с # и быть длиной от 1 до 20 символов, содержать только латинские буквы');


pristine.addValidator(imageUploadHashtags, (value) => {
  const hashtagArr = value.split(' ');
  const hashtagSet = new Set();
  for (let i = 0; i < hashtagArr.length; i++) {
    const hashtagLow = hashtagArr[i].toLowerCase();
    if (hashtagSet.has(hashtagLow)) {
      return false;
    }
    hashtagSet.add(hashtagLow);
  }
  return true;
}, 'Хэштег не должен повторяться');


pristine.addValidator(imageUploadHashtags, (value) => {
  const hashtagArr = value.split(' ');
  if (hashtagArr.length === 1 && hashtagArr[0] === '') {
    return true;
  }
  if (hashtagArr.length > MAX_HASHTAGS) {
    return false;
  }
  return true;
}, 'Хэштегов не должно быть больше пяти');


pristine.addValidator(imageUploadDescription, (value) => {
  if (value.length <= DESCRIPTION_LENGTH) {
    return true;
  }
  return false;
}, 'Текст комментария должен быть не более 140 символов');


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


