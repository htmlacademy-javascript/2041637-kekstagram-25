import {getImageDescriptions} from './data.js';
import {generateImagesFromData} from './image-generator.js';

const imageDescriptions = getImageDescriptions();
generateImagesFromData(imageDescriptions);

