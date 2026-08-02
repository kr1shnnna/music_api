    const express = require('express');
    const musicController = require('../controllers/music.controller');
    const authMiddleware = require('../middlewares/auth.middleware');

    const multer=require('multer');


    const upload=multer({     // multer is used to upload the files in the req body and we are using memory storage to store the files in the memory of the server
        storage:multer.memoryStorage()
    })

    const router = express.Router();

    router.post('/upload',authMiddleware.authArtist,upload.single('music'),musicController.createMusic);

    router.post('/create-album',authMiddleware.authArtist,musicController.createAlbum);






    module.exports = router;