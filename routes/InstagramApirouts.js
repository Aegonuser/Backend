const express = require('express');
const router = express.Router();
const { getInstagramProfile } = require('../controllers/InstagramApiControllers');
const { downloadImage } = require('../controllers/downloadImagecontrollers')

router.get("/api/instagram-profile", getInstagramProfile);
router.get("/download-image", downloadImage);

module.exports = router;
