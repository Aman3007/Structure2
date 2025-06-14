import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
          minLength: 4 
    },
    Email:{
        type:String,
        required:true
    }
})

UserSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userid:this._id.toString(),
            email:this.email,
           
        }, process.env.JWT_SECURE_KEY,{
            expiresIn:"30d"
        })
       
    } catch (error) {
        console.log("error")
    }
}

export const VerifyJWTToken=(token)=>{
  return  jwt.verify(token,process.env.JWT_SECURE_KEY)
}

const Data = mongoose.model("Data", UserSchema);
export default Data;