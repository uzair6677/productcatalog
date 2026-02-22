import express from "express";
import cors from "cors";
import rateLimiter from "./middleware/ratelimiter";
import dotenv from "dotenv";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const Port = process.env.PORT || 3001;
//middle wares
app.use(express.json());
app.use(cors()); // this midlelayer is used to parse the incoming request body as JSON, making it easier to work with the data sent by clients in POST and PUT requests. It allows us to access the data in req.body as a JavaScript object.
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log("we just log into new request");
  next();
});
app.use("/api/notes", notesRouter);
connectDB().then(() => {
  app.listen(Port, () => {
    console.log("Server is running on port 3000");
  });
});
