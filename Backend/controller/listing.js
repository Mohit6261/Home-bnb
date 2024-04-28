import mongoose from "mongoose";
import { Listing } from '../model/listingModel.js';
import { Review } from "../model/review.js";
import { query } from "express";


const stripe= process.env.STRIPE_SECRET_KEY;


export const fetchDataFromMongoDB = async (req, res) => {
    try {
      const data = await Listing.find(); 
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB Atlas:', error);
    }
  };
  
  
  export const fetchDataFromMongoDBbyId = async (req,res) => {
       
         try{
           const listing=await Listing.findById(req.params.id).populate("reviews").populate("favourite");
           if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
          }
          res.json(listing);
         }catch(err){
           console.log(err);
         }
  }

  export const addNewDataToMongoDB = async (req,res) => {
            try{
               const {title,description,image,price,location,country,Hostname}=req.body;
               if(!title || !description || !image || !price || !location || !country || !Hostname){
                    return res.status(401).json({
                      message:"Please don't leave any field empty",
                      success:false
                    })
               }
               //const collection = Listing.collection;
               //const result=await Listing.insertMany(req.body);
               //const result = await collection.insertOne(req.body, { maxTimeMS: 30000 });
               
              // const result = await Listing.insertOne(req.body);

              const newListing=new Listing(req.body);
              console.log(newListing);
              await newListing.save();

               res.status(200).json({
                  message:"YOU are now a member of airbnb and proud host",
                  success:true
               })
            }catch(err){
               console.log(err);
            }
  }


  function calculateAmount(startDate, endDate, guests) {
    // Example: calculate amount based on duration and number of guests
    return 100; // Replace with your actual calculation
  }


  export const createPaymentSession = async (req,res) => {
    try {
      const { card, startDate, endDate, guests } = req.body;
      console.log(req.body);
      const amount = calculateAmount(startDate, endDate, guests);
  
      // Create payment session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'INR',
              product_data: {
                name: 'Your Product Name',
              },
              unit_amount: amount, // Stripe requires amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://yourwebsite.com/success', // Redirect URL after successful payment
        cancel_url: 'http://yourwebsite.com/cancel', // Redirect URL after payment cancellation
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating payment session:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  
  export const addNewReview =async (req,res) => {
       try{
          const  listing=await Listing.findById(req.params.id);
          
          if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
                success: false
            });
        }
          
          const {rating,comments}=req.body;

          if(!rating || !comments){
            return res.status(401).json({
              message:"Please don't leave any field empty",
              success:false
            })
       }

          const newReview=new Review({rating,comments});
          
          listing.reviews.push(newReview);

          await newReview.save();
          await listing.save();

          return res.status(200).json({
             message:"Review added successfully",
             success:true
          })
       }catch(err){
          console.log(err);
          return res.status(500).json({
            message: "Internal server error",
            success: false
        });
       }
  }


  export const displayAllReviews = async(req,res) => {
       try{
         
           const listing = await Listing.findById(req.params.id);
           console.log(listing);
       }catch(err){
         console.log(err);
       }
  }

  export const chkavailable = async (req,res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    console.log(req.query);
    try {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
  
      // const overlappingBooking = listing.isBooking.some(availability => {
      //   return (startDate < availability.endDate && endDate > availability.startDate);
      // });
  
      // if (overlappingBooking) {
      //   return res.status(200).json({ message: "Booking already exists for this date range",
      //                                 success:true,
      // });
      // }

      const overlappingBooking = listing.isBooking.some(availability => {
        const existingStartDate = new Date(availability.startDate);
        const existingEndDate = new Date(availability.endDate);
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        // Check for overlap: if new start date is before existing end date, and new end date is after existing start date
        return (newStartDate < existingEndDate && newEndDate > existingStartDate);
    });
     
     if (overlappingBooking) {
      return res.status(200).json({ message: "Booking already exists for this date range", success: false });
     }

      return res.status(200).json({
          message : "Booking is available",
          success:true,
      })
  }catch(err){
      console.log(err);
  }
 }

 export const isBooked = async(req,res) => {
      const { id } = req.params;
      const { startDate, endDate } = req.body;
      console.log(req.body);
      try {
        const listing = await Listing.findById(id);
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }

        listing.isBooking.push({ startDate, endDate });
        await listing.save();
    
        res.status(201).json({ message: "Booking successful", success:true,listing});
      } catch (error) {
        console.error('Error adding availability:', error);
        res.status(500).json({ message: "Internal server error" });
      }
 }


 export const searchListingbyUser = async(req,res) => {
     try{
       const {selectedCountry,chk}=req.query;
       console.log(req.query);
       
       const query = {
        country: selectedCountry,
        location: chk,
       };

    const response = await Listing.find(query);
   if (response.length === 0) {
            return res.status(200).json({
                message: "No accommodations found for the provided country and location",
                success: false
            });
        }

    res.json(response);
     }
     catch(er){
        console.log(er);
     }
 }