const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// CREATE
router.post('/', albumController.createAlbum);

// READ
router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);

// UPDATE
router.put('/:id', albumController.updateAlbum);

// DELETE
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;