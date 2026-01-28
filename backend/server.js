import express from "express";
import notesRouter from "./src/routes/notesRoutes.js";
const app = express();

app.use("/api/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
