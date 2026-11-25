import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { initUploadForm } from './upload-form.js';

const photos = createPhotos();
renderThumbnails(photos);
initUploadForm();
