import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";



dotenv.config({
    path:".env"
});


databaseConnection();

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user",userRoutes);



app.listen(process.env.PORT,() => {
    console.log(`app is listening to port ${process.env.PORT}`);
})