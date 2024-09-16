import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    const response = await mongoose.connect(url);
    const host = await response.connection.host;
    console.log("Connected to Database at: " + host);
  } catch (error) {
    console.log("Error connecting to Database: " + error.message);
  }
};

export default connectDB;
