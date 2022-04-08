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

const showMoreCommentsHandler = () => {
  const comments = remainingComments.splice(0, COMMENTS_TO_SHOW);
  if (remainingComments.length === 0) {
    bigImageCommentsLoader.classList.add('hidden');
  }
  if (remainingComments.length !== 0) {
    bigImageCommentsLoader.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentTemplate = document.createElement('li');
    commentTemplate.classList.add('social__comment');
    commentTemplate.innerHTML = '<img class="social__picture" width="35" height="35"> <p class="social__text"></p>';
    const commentTemplateCopy = commentTemplate.cloneNode(true);
    const userAvatar = commentTemplateCopy.querySelector('.social__picture');
    const userComment = commentTemplateCopy.querySelector('.social__text');
    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;
    userComment.textContent = comment.message;
    commentsFragment.append(commentTemplateCopy);
  });
  bigImageComments.appendChild(commentsFragment);
  const displayedCommentsNumber = imageData.comments.length - remainingComments.length;
  const commentsNumber = imageData.comments.length;
  bigImageSocialCommentCount.textContent = `${displayedCommentsNumber  } из `;
  bigImageCommentsCount.textContent = commentsNumber;
  bigImageSocialCommentCount.textContent += bigImageCommentsCount.innerHTML;
  bigImageSocialCommentCount.textContent += ' комментариев';
};

const closeBigImageFormHandler = (evt) => {
  if (isEscPressed(evt) || evt.type === 'click') {
    bigImageForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigImageFormHandler);
    bigImageCancelButton.removeEventListener('click', closeBigImageFormHandler);
    bigImageCommentsLoader.removeEventListener('click', showMoreCommentsHandler);
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
  showMoreCommentsHandler();
  bigImageForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeBigImageFormHandler);
  bigImageCancelButton.addEventListener('click', closeBigImageFormHandler);
  bigImageCommentsLoader.addEventListener('click', showMoreCommentsHandler);
};

export {openBigImageForm};

