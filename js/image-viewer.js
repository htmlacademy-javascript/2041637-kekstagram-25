import {isEscPressed} from './util.js';

const COMMENTS_TO_SHOW = 5;

const bigImageForm = document.querySelector('.big-picture');
const bigImage = bigImageForm.querySelector('.big-picture__img').querySelector('img');
const bigImageLikes = bigImageForm.querySelector('.likes-count');
const bigImageCommentsCount = bigImageForm.querySelector('.comments-count');
const bigImageComments = bigImageForm.querySelector('.social__comments');
const bigImageDescription = bigImageForm.querySelector('.social__caption');
const bigImageSocialCommentCount = bigImageForm.querySelector('.social__comment-count');
const bigImageCommentsLoader = bigImageForm.querySelector('.comments-loader');
const bigImageCancelButton = bigImageForm.querySelector('.big-picture__cancel');
let imageData;
let remainingComments;

const showMoreComments = () => {
  const comments = remainingComments.splice(0, COMMENTS_TO_SHOW);
  if (remainingComments.length === 0) {
    bigImageCommentsLoader.classList.add('hidden');
  }
  if (remainingComments.length !== 0) {
    bigImageCommentsLoader.classList.remove('hidden');
  }
  let commentHtml = '';
  comments.forEach((comment) => {
    commentHtml += `<li class="social__comment">
          <img
              class="social__picture"
              src="${comment.avatar}"
              alt="${comment.name}"
              width="35" height="35">
          <p class="social__text">${comment.message}</p>
      </li>`;
  });
  bigImageComments.insertAdjacentHTML('beforeend', commentHtml);
  bigImageSocialCommentCount.innerHTML = `${imageData.comments.length - remainingComments.length} из <span class="comments-count">${imageData.comments.length}</span> комментариев`;
};

const closeBigImageFormHandler = (evt) => {
  if (isEscPressed(evt) || evt.type === 'click') {
    bigImageForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigImageFormHandler);
    bigImageCancelButton.removeEventListener('click', closeBigImageFormHandler);
    bigImageCommentsLoader.removeEventListener('click', showMoreComments);
  }
};

const openBigImageForm = (imageDescription) => {
  imageData = imageDescription;
  remainingComments = imageData.comments.slice();
  bigImage.src = imageData.url;
  bigImageLikes.textContent = imageData.likes;
  bigImageCommentsCount.textContent = imageData.comments.length;
  bigImageComments.innerHTML = '';
  bigImageDescription.textContent = imageData.description;
  showMoreComments();
  bigImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeBigImageFormHandler);
  bigImageCancelButton.addEventListener('click', closeBigImageFormHandler);
  bigImageCommentsLoader.addEventListener('click', showMoreComments);
};

export {openBigImageForm};

