import express from "express";
import {
  CreateNote,
  DeleteNote,
  getAllNotes,
  UpdateNote,
} from "../controller/notesController.js";

const router = express.Router();
router.get("/", getAllNotes);
router.post("/", CreateNote);

router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);

export default router;
