const express = require('express');
const router = express.Router();

const controller = require('../controllers/songController'); // or songsController if that's correct

console.log('SONG CONTROLLER:', controller); // debug AFTER import

router.get('/', controller.getAllSongs);
router.get('/:id', controller.getSongById);
router.post('/', controller.createSong);
router.put('/:id', controller.updateSong);
router.delete('/:id', controller.deleteSong);

module.exports = router;