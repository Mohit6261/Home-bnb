import mongoose, { Schema } from "mongoose";

const listingSchema = new mongoose.Schema({
       title:{
          type:String,
          require:true
       },
       description:{
          type:String,
          require:true
       },
       image:{
         type:String,
         require:true
       },
       price:{
        type:Number,
        require:true
       },
       location:{
         type:String,
         require:true
       },
       country:{
        type:String,
        require:true
       },
       Hostname:{
         type:String,
         require:true
       },
       reviews:[{
          type:Schema.Types.ObjectId,
          ref:"Review",
       }],
       favourite:[{
        type:Schema.Types.ObjectId,
        ref:"Favourite",
   }],
   isBooking:[{
      startDate:Date,
      endDate:Date,
   }]
},{timestamps:true});

export const Listing = mongoose.model("Listing",listingSchema);