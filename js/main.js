import {generateImagesFromData} from './image-generator.js';
import {getData} from './network.js';
import {showAlert} from './util.js';
import './image-upload.js';

getData(generateImagesFromData, showAlert);

/*const imageDescriptions = getImageDescriptions();
generateImagesFromData(imageDescriptions);*/

