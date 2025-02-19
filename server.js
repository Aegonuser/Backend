const express = require("express");
const cors = require("cors");
const path = require('path');
// const mongoose = require('mongoose');
// const connectDB = require('./config/db');

require("dotenv").config();
const instagramRoutes = require('./routes/InstagramApirouts'); // import routes

const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON in the request body

// Serve images statically
const public = path.join(__dirname, 'images');
app.use('/images', express.static(public));

// Register routes
app.use(instagramRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   }).catch(err => {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   });






















// const express = require("express");
// const cors = require("cors");
// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose')
// require("dotenv").config();
// // const bodyParser = require("body-parser");
// // const qrcode = require("qrcode");
// // const db = require("./database");

// const app = express();
// // app.use(bodyParser.json());
// app.use(cors()); // Allow requests from all origins
// // Serve images statically
// const public = path.join(__dirname, 'images');
// // Ensure the images directory exists
// if (!fs.existsSync(public)) {
//   fs.mkdirSync(public);
// }

// app.use('/images', express.static(public));

// const PORT = process.env.PORT || 5000;

// app.get("/api/instagram-profile", async (req, res) => {
  
//   const username = req.query.username;
//   if (!username) return res.status(400).json({ error: "Username is required" });

//   const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
  
//   console.log('Request URL:', url);
//   console.log('Headers:', process.env.INSTAGRAM_USER_AGENT, process.env.INSTAGRAM_COOKIE);

//   const myHeaders = {
//     "User-Agent": process.env.INSTAGRAM_USER_AGENT,
//     "Cookie": process.env.INSTAGRAM_COOKIE,
//     "X-IG-App-ID": "936619743392459",
//     "Accept": "*/*",
//     "Sec-Fetch-Site": "same-site",
//     "Sec-Fetch-Mode": "cors",
//     "Sec-Fetch-Dest": "empty",
//     "Accept-Language": "en-US,en;q=0.9",
//     "Origin": "https://www.instagram.com",
//     "Referer": "https://www.instagram.com/"
//   };

//   try {
//     const response = await fetch(url, { 
//       method: "GET", 
//       headers: myHeaders,
//       redirect: "follow",
//       credentials:'include'
//     });
    
//     console.log('Response status:', response.status);
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Error response:', errorText);
//       throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
//     }
    
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Detailed error:', error.message);
//     res.status(500).json({ 
//       error: "Failed to fetch Instagram profile",
//       details: error.message 
//     });
//   }
// });


// API to fetch and save image
// app.get('/download-image', async (req, res) => {
//   const imageUrl = req.query.url; // URL of the Instagram image

//   if (!imageUrl) {
//       return res.status(400).json({ error: 'Image URL is required' });
//   }

//   try {
//       const axios = require('axios');
      
//       const response = await axios.get(imageUrl, { responseType: 'stream' });
//       const filename = `image_${Date.now()}.jpg`;
//       const filePath = path.join(public, filename);
//       const writer = fs.createWriteStream(filePath);

//       response.data.pipe(writer);

//       writer.on('finish', () => {
//           res.json({ imageUrl: `/images/${filename}` }); // Send the new URL to frontend
//       });

//       writer.on('error', (err) => {
//           console.error(err);
//           res.status(500).json({ error: 'Failed to save image' });
//       });

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch image' });
//   }
// });


// Generate qr code
// app.post("/generate-qr", async (req, res) => {
//   const { order_id, amount } = req.body;
//   const paymentData = `PAY TO: John Doe, AMOUNT: ${amount}, ORDER_ID: ${order_id}`;

//   try {
//       const qrImage = await qrcode.toDataURL(paymentData);
//       db.run(`INSERT INTO transactions (order_id, amount) VALUES (?, ?)`, [order_id, amount]);
//       res.json({ qrCode: qrImage, message: "QR Code Generated!" });
//   } catch (err) {
//       res.status(500).json({ error: "QR Code generation failed" });
//   }
// });

// verify payment
// app.post("/verify-utr", (req, res) => {
//   const { utr, order_id } = req.body;

//   db.get("SELECT * FROM transactions WHERE order_id = ? AND status = 'pending'", [order_id], (err, transaction) => {
//       if (err) return res.status(500).json({ error: "Database error" });

//       if (transaction) {
//           db.run("UPDATE transactions SET expected_utr = ?, status = 'verified' WHERE order_id = ?", [utr, order_id]);
//           return res.json({ message: "Payment Verified!" });
//       } else {
//           return res.status(400).json({ error: "Order not found or already verified" });
//       }
//   });
// });