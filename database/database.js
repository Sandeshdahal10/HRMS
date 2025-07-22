import mongoose from 'mongoose';
const connectDB = async () => {
  try{
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
  }catch(err){
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
