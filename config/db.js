const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Use your MongoDB URI
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client; // Change to your actual DB name
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // throw new Error('Failed to connect to MongoDB');
  }
};

module.exports = connectDB;
