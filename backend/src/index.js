import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"
import todoRoutes from "./routes/todo.route.js"
import path from "path";


dotenv.config();

const app=express();

app.use(express.json())

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/todos",todoRoutes);


app.listen("3000",()=>{
     connectDB();
    console.log("Listening at 3000");
   
})