import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"

import bodyParser from "body-parser";
import cookieparser from "cookie-parser"
import { verifyAuthenticationToken } from "./middleware.js/auth-niddelware.js";
const app = express();
const PORT = 5000;
import mongoose from "mongoose";
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieparser()); 
app.use(express.json());
app.use(verifyAuthenticationToken)
// app.use((req,res,next)=>{
//   res.locals.user=req.User
//   return next();
// })
import userRoutes from "./Routes/auth-routes.js"
// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:5173", // Only allow React dev server
  methods: ["GET", "POST","PUT","DELETE"],        // Allowed HTTP methods
  credentials: true                // Allow cookies/auth headers if needed
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));





const arr=["aman","singh","chauhan"];


app.get("/api/data", (req, res) => {
  res.json({ message: arr});
});
// POST route in Express (index.js)
app.get("/", async (req, res) => {
  res.send({"name":"Raja Babu"})
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
