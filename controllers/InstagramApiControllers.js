const connectDB = require('../config/db');
// const { MongoClient } = require('mongodb');
require("dotenv").config();

const getInstagramProfile = async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const url = `${process.env.HOST_URL}/?username=${username}`;

  const myHeaders = {
    "User-Agent": process.env.INSTAGRAM_USER_AGENT,
    "Cookie": process.env.INSTAGRAM_COOKIE,
    "X-IG-App-ID": "936619743392459",
    "Accept": "*/*",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Accept-Language": "en-US,en;q=0.9",
    "Origin": "https://www.instagram.com",
    "Referer": "https://www.instagram.com/"
  };

  try {
    const response = await fetch(url, { 
      method: "GET", 
      headers: myHeaders,
      redirect: "follow",
      credentials:'include'
    });
    const data = await response.json();
    // console.log(data);


    // Save data to MongoDB
    const client = await connectDB();
    // try {
    //   const db = client.db('backend'); // Replace 'backend' with your database name
    //   const collection = db.collection('users'); // Replace 'users' with your collection name
    //   await collection.insertOne(data);
    // } finally {
    //   await client.close(); // Ensure the client is closed after the operation
    // }

    // async function saveUserData(username, data) {
      try {
        // Connect to MongoDB
        await client.connect();
    
        // Get the database and collection
        const db = client.db("backend");
        const collection = db.collection("users");
    
        // Create a document to insert
        console.log(data.data.user.username, " : username with data");
        const document = {
          username: data.data.user.username,
          userData: data.data.user,
          status:data.status,
        };
    
        // Insert the document into the collection
        const result = await collection.insertOne(document);
        // console.log(`User data saved with ID: ${result.insertedId}`);
      } catch (err) {
        console.error('Error saving user data:', err);
      } finally {
        // Close the connection
        await client.close();
      }
    // }

    res.json(data);
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    res.status(500).json({ error: "Failed to fetch Instagram profile", details: error.message });
  }
};

module.exports = { getInstagramProfile };