import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for successful connection
    mongoose.connection.on('connected', () => 
      console.log("Database Connected")
    );
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}/bloginfo`);
    
  } catch (error) {
    console.log(error.message);
  }
}
export default connectDB;
