import express from "express";
import {  LikedChk, Login, Logout, Register, chkLiked } from "../controller/user.js";
import { addNewDataToMongoDB, addNewReview, chkavailable, createPaymentSession, displayAllReviews, fetchDataFromMongoDB, fetchDataFromMongoDBbyId, isBooked, searchListingbyUser } from "../controller/listing.js";
import Razorpay from "razorpay";
import crypto from "crypto";


const router=express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/data").get(fetchDataFromMongoDB);
router.route("/cards/:id").get(fetchDataFromMongoDBbyId);
router.route("/newlistings").post(addNewDataToMongoDB);
router.route("/:id/favouritebackend").post(LikedChk);
router.route("/:id/review").post(addNewReview);
router.route("/showreviews/:id").get(displayAllReviews);
router.route("/:id/checkfavourite").get(chkLiked);
router.route("/listings/:id/availability").post(isBooked);
router.route("/listings/:id/chkavailable").get(chkavailable);
router.route("/listings/searchlistingbyuser").get(searchListingbyUser);

router.post("/orders",async(req,res) => {
    console.log(1);
     try{
        const instance=new Razorpay({
             key_id:process.env.KEY_ID,
             key_secret:process.env.KEY_SECRET,
        });
        
        const options = {
            amount:req.body.amount*100,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options,(error,order) => {
             if(error){
                console.log(error);
                return res.status(500),json({
                    message:"Something went wrong"
                });
             }
             res.status(200).json({
                data:order
             })
        });
     }catch(err){
       console.log(err);
     }
})


router.post("/verify",async(req,res) => {
      try{
        const{
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        }=req.body;

        const sign=razorpay_order_id + " " + razorpay_payment_id;
        const expectedSign = crypto
        .createHmac("sha256",process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if(razorpay_signature === expectedSign){
             return res.status(200).json({
                 message:"Payment verified successsfully",
             })
        }else{
             res.status(400).json({
                 message:"Invalid signature sent",
             })
        }
      } catch(err){
         console.log(err);
         res.status(500).json({
              message:"Internal server error"
         })
      }
})

export default router;

