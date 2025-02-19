const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Serve images statically
const public = path.join(__dirname,'..','images');
// Ensure the images directory exists
if (!fs.existsSync(public)) {
  fs.mkdirSync(public);
}

const downloadImage = async (req, res) => {
  const imageUrl = req.query.url; // URL of the Instagram image

  if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
      
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      const filename = `image_${Date.now()}.jpg`;
      const filePath = path.join(public, filename);
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      writer.on('finish', () => {
          res.json({ imageUrl: `/images/${filename}` }); // Send the new URL to frontend

          setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete image:', err);
                } else {
                    console.log('Image deleted:', filename);
                }
            });
        }, 5000); // Adjust the delay as needed (e.g., 5000ms = 5 seconds)
    
      });

      writer.on('error', (err) => {
          console.error(err);
          res.status(500).json({ error: 'Failed to save image' });
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch image' });
  }
};

module.exports = {downloadImage};