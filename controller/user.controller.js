import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const createUser = async (req, res)=>{
  try{
    const { userName, email, password, role } = req.body;
    if(userName == ""|| email == "" || password == "" || role == ""){
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }
  

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
    role
  })
  await newUser.save();
  const user = newUser.toObject();
  delete user.password;

    res.status(200).json({
            message: "User created successfully",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllUser= async (req, res)=>{
  try{
      const users = await User.find();
      res.status(200).json({
        message: "User fetched successfully!!",
        users
      });
  }catch (error){
    res.status(500).json({
      message: "Internal Server Error!!",
      error: error.message
    })
  }
};

export const getUserById = async (req, res)=>{
  try{
    const userid = req.params.id;
    const user = await User.findById(userid);
    if(!user){
      return res.status(404).json({
        message: "User not found!"

      })
    }
    res.status(200).json({
      message:"User fetched Successfully!",
      user
    })
  }catch(error){
    res.status(500).json({
      message: "Internal Server error!",
      error: error.message
    })
  }
}

export const updateUser = async (req, res)=>{
  try{
    const userid = req.params.id;
    const updates = req.body;
    if(updates.password){
      delete updates.password;
    }

    const user = await User.findByIdAndUpdate(userid, updates, { new: true });
    if(!user){
      return res.status(404).json({
        message: "User not found!"
      });
    }
    res.status(200).json({
      message: "User updated successfully!",
      user
    });
  }catch(error){
    res.status(500).json({
      message: "Internal Server error!",
      error: error.message
    });
  }
};

export const deleteUser = async (req, res)=>{
  try{
    const userid = req.params.id;
    const user = await User.findByIdAndDelete(userid);
    if(!user){
      return res.status(404).json({
        message: "User not found!"
      });
    }
    res.status(200).json({
      message: "User deleted successfully!",
      user
    });
  }catch(error){
    res.status(500).json({
      message: "Internal Server error!",
      error: error.message
    });
  }
}

