import mongoose from 'mongoose';
const connectDB = async () => {
  try{
    const connect = await mongoose.connect;
    console.log('MongoDB connected successfully!');
  }catch(err){
    console.error('MongoDB connection failed:', err);
  }
};

export default connectDB;
