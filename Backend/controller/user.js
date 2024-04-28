import axios from "axios"
import { User } from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Listing } from "../model/listingModel.js";
import { Favourite } from "../model/Favourite.js";

export const Login = async(req,res) => {
        try{
            
             const {email,password}=req.body;
             if(!email || !password){
              return res.status(401).json({
                 message:"Invalid email or password",
                 success:false,
              })
           }
            console.log(req.body);
             const user=await User.findOne({email});
            console.log(user);
             if(!user){
                return res.status(401).json({
                  message:"Email doesn't exist",
                  success:"false"
                })
             }
             
            
             const isMatch=bcryptjs.compare(password,user.password);
             if(isMatch){

                const tokenData= {
                  id:user._id
               }
               
               const token=jwt.sign(tokenData,"fsfdghtrfsadffd",{expiresIn:"1d"});
                  return res.status(200).cookie("token",token,{httpOnly:true}).json({
                  message:`Welcome Back ${user.fullname}`,
                  user,
                  success:true,
               })
                
             }

             return res.status(401).json({
                    message:"Wrong password!,Please try again",
                    success:false
             })

        }catch(err){
            console.log(err);
        }
}

export const Logout =async (req,res) => {
   return  res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
         message:"Logout successfully",
         success:true,
   })
}



export const Register =async(req,res) => {
    try{
       const {name,email,password}=req.body;
       console.log(req.body);
       if(!name || !email || !password){
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
     
       const hashedPassword = await bcryptjs.hash(password,16);
      await User.create({
          name,
          email,
          password:hashedPassword
      })

      return res.status(200).json({
        message:"User successfully registerd",
        success:true
      });

    } catch(err){
        console.log(err.message);
    }     
}

export const LikedChk =async (req,res) => {
   try{
      const  listing=await Listing.findById(req.params.id);
      console.log(listing);
      if (!listing) {
        return res.status(404).json({
            message: "Listing not found",
            success: false
        });
    }
      
      const {liked}=req.body;
      
      const instance=new Favourite({liked});
      if(listing.favourite.length==1){
         const list=listing.favourite[0];
         const id = list;
         console.log(id.toHexString());
         await Favourite.findByIdAndDelete(id);
         
           
         // await Listing.updateOne(
         //    { $set: { favourite: [] } } 
         // )

         await Listing.updateOne({ _id: listing._id }, { $set: { favourite: [] } });

           //listing.favourite.push(instance);
           //await instance.save();
           //await listing.save();
           return res.status(200).json({
            message:"Favourite Listing removed",
            success:true
         })
      }
      else{
         listing.favourite.push(instance);
         await instance.save();
         await listing.save();
           return res.status(200).json({
            message:"Favourite Listing added",
            success:true
         })
      }   

   }catch(err){
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false
    });
   }
}

export const chkLiked = async(req,res)=>{
     try{
       const listing=await Listing.findById(req.params.id);
       res.json(listing);
     }catch(err){
        console.log(err);
     }
}