import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import initData from "./utils/init.js";
import { Listing } from "./model/listingModel.js";

dotenv.config({
    path:".env",
});


databaseConnection();

//Listing.insertMany(initData);
//Listing.deleteMany({});
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions=({
    origin:"http://localhost:3000",
    credentials:true
})

app.use(cors(corsOptions));
app.use("/api/v1/user",userRoutes);
//app.use("/api/v1/user",listingRoutes);


app.listen(process.env.PORT,() => {
    console.log(`app is listening to port ${process.env.PORT}`);
})