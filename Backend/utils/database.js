import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"../.env"
})


const databaseConnection = () => {
     mongoose.connect(process.env.MONGO_URI).then( () => {
         console.log("connection successful");
     }).catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
     });
}

export default databaseConnection;