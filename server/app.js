import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import ItemRoutes from './routes/ItemRoutes.js'
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import claimRoutes from "./routes/claimRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";



// ✅ Create express app
const app = express()

// ✅ Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"));
app.use("/admin", adminRoutes);
app.use("/claims", claimRoutes);
app.use("/reports", reportRoutes);

// ✅ CORS headers (your original code kept)
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    )
    next()
})

// ✅ Routes
app.use('/users', userRoutes)
app.use('/Items', ItemRoutes)

// ✅ Get PORT and MongoDB URI from .env
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

// ✅ Connect MongoDB and start server
mongoose.connect(db)
.then(() => {
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
        console.log("Server running on PORT:", port);
    });
})
.catch((err) => {
    console.log("MongoDB connection error:", err.message);
});
