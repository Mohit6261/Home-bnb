import mongoose, { Schema } from "mongoose";

const favouriteSchema = new mongoose.Schema({
      liked:{
          type:String,
      },
      createdAt:{
        type:Date,
        default:Date.now()
    },
})

export const Favourite=mongoose.model("Favourite",favouriteSchema);