import Notes from "../models/Notes.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch {
    res.status(500).json({ message: "failed to fetch notes" });
  }
}

export async function CreateNote(req, res) {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const newNote = new Notes({ title: title, content: content });
    await newNote.save();
    res.status(201).json({ message: "note created succeefully" });
  } catch (error) {}
  res.status(500).json({ message: "notes not  created succeessfully" });
}

export async function UpdateNote(req, res) {
  res.status(200).json({ message: "notes updated succeessfully" });
}

export async function DeleteNote(req, res) {
  res.status(200).json({ message: "notes deleted succeessfully" });
}
