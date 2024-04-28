import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
     comments:String,
     rating:{
        type:Number,
        min:1,
        max:5
     },
     createdAt:{
         type:Date,
         default:Date.now()
     },
     
})

export const Review=mongoose.model("Review",reviewSchema);