const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// CREATE
router.post('/', artistController.createArtist);

// READ
router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);

// UPDATE
router.put('/:id', artistController.updateArtist);

// DELETE
router.delete('/:id', artistController.deleteArtist);

module.exports = router;