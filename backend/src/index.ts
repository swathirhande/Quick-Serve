import express , {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoutes from "./routes/MyUserRoutes"
import {v2 as cloudinary} from "cloudinary";
import MyRestaurantRoute from "./routes/MyRestaurantRoute"
import RestaurantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoute"

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(()=>console.log("Connected to Database"))

//initialize the connection to cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();

app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" })); //for validation and security reasons
app.use(express.json())
//basic endpoint to the server, to check if server has successfully started
app.get("/health", async(req: Request, res: Response)=>{
    res.send({message: "health ok!"}) 
})
app.use("/api/my/user", MyUserRoutes);
app.use("/api/my/restaurant", MyRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/order",orderRoute);

app.listen(8000, ()=>{
    console.log("Server started on localhost:8000")
})


