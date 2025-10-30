import mongoose from "mongoose";

const connectDB = async (DB_URI) => {
  try {
    const connect = await mongoose.connect(DB_URI);
    console.log("monogDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
