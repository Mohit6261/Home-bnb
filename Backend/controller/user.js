import axios from "axios"
import { User } from "../model/userModel.js";

export const Register =async(req,res) => {
    try{
       const {fullName,email,password}=req.body;
       console.log("yha tk to aa rhi req");
       if(!fullName || !email || !password){
          return res.status(401).json({
            message:"Please don't left empty any field",
            success:false
          })
       }

       const user= await User.findOne({email});
       if(user){
         return res.status(401).json({
            message:"Email already exists",
            success:false
         })
       }

      await User.create({
          fullName,
          email,
          password
      })

      return res.status(200).json({
        message:"User successfully registerd",
        success:true
      });

    } catch(err){
        console.log(err.message);
    }     
}

