import express from "express";
import {
  CreateNote,
  DeleteNote,
  getAllNotes,
  UpdateNote,
  getNotesById,
} from "../controller/notesController.js";

const router = express.Router();
router.get("/", getAllNotes);
router.get("/:id", getNotesById);
router.post("/", CreateNote);

router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);

export default router;
