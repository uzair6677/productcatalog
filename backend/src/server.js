import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
const app = express();

app.use("/api/notes", notesRouter);
connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
