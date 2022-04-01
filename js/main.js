import {generateImagesFromData} from './image-generator.js';
import {getData} from './network.js';
import {showAlert} from './util.js';
import {addFilterListeners} from './image-generator.js';
import './image-upload.js';

getData((imageDescriptions) => {
  generateImagesFromData(imageDescriptions);
  addFilterListeners(imageDescriptions);
}, showAlert);
