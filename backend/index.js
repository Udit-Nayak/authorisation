import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "../backend/routes/auth.route.js";

dotenv.config();

const port=process.env.PORT || 3000;
const app=express();
const __dirname=path.resolve();
app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",authRoutes);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}


app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
});

