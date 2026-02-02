import mongoose, { model } from "mongoose";
// create a schema
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }, // craete and update time
);
//now carete model on base of schema
const Note = mongoose.model("Note", noteSchema);
export default Note;
