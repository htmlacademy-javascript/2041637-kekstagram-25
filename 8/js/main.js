import {getImageDescriptions} from './data.js';
import {generateImagesFromData} from './image-generator.js';
import './image-upload.js';

const imageDescriptions = getImageDescriptions();
generateImagesFromData(imageDescriptions);

