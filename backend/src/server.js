import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const Port = process.env.PORT || 3001;
//middle wares
app.use(express.json());
app.use("/api/notes", notesRouter);
connectDB();

app.listen(Port, () => {
  console.log("Server is running on port 3000");
});
