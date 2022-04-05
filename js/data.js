const GET_DATA_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        onFail('Не удалось загрузить информацию о фотографиях');
      }
    })
    .then((data) => onSuccess(data))
    .catch(onFail);
};

const sendData = (onSuccess, onFail, formData) => {
  fetch(SEND_DATA_URL, {
    method: 'POST',
    contentType: 'multipart/form-data',
    body: formData})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getData, sendData};

