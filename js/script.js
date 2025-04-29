import { initNavbar } from './navbar.js';
import { initVideoControls } from './video.js';
import { initJobs } from './jobs.js';
import { initMap } from './map.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initVideoControls();
  initJobs();
  initMap();
});
