import {isEscPressed} from './util.js';

const bigImageForm = document.querySelector('.big-picture');
const bigImage = bigImageForm.querySelector('.big-picture__img').querySelector('img');
const bigImageLikes = bigImageForm.querySelector('.likes-count');
const bigImageCommentsCount = bigImageForm.querySelector('.comments-count');
const bigImageComments = bigImageForm.querySelector('.social__comments');
const bigImageDescription = bigImageForm.querySelector('.social__caption');
const bigImageSocialCommentCount = bigImageForm.querySelector('.social__comment-count');
const bigImageCommentsLoader = bigImageForm.querySelector('.comments-loader');
const bigImageCancelButton = bigImageForm.querySelector('.big-picture__cancel');


const closeOnEscHandler = (evt) => {
  if (isEscPressed(evt)) {
    bigImageForm.classList.add('hidden');
    document.removeEventListener('keydown', closeOnEscHandler);
    bigImageCancelButton.removeEventListener('click', closeOnEscHandler);
  }
};

const closeOnButtonHandler = () => {
  bigImageForm.classList.add('hidden');
  document.removeEventListener('keydown', closeOnButtonHandler);
  bigImageCancelButton.removeEventListener('click', closeOnButtonHandler);
};

const openBigImageForm = (imageDescription) => {
  bigImageForm.classList.remove('hidden');
  bigImage.src = imageDescription.url;
  bigImageLikes.textContent = imageDescription.likes;
  bigImageCommentsCount.textContent = imageDescription.comments.length;
  imageDescription.comments.forEach((comment) => {
    const commentHtml = `<li class="social__comment">
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message}</p>
    </li>`;
    bigImageComments.insertAdjacentHTML('beforeend', commentHtml);
  });
  bigImageDescription.textContent = imageDescription.description;
  bigImageSocialCommentCount.classList.add('hidden');
  bigImageCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnEscHandler);
  bigImageCancelButton.addEventListener('click', closeOnButtonHandler);
};

export {openBigImageForm};

