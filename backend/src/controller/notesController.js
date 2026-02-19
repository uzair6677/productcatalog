import Notes from "../models/Notes.js";
export async function getAllNotes(_, res) {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 }); // return newest note first
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "failed to fetch notes" });
  }
}
export async function getNotesById(req, res) {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });
    res.json(note);
  } catch (error) {
    console.error("error in getNotesById controller", error);
    res.status(500).json({ message: "internal server error" });
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
  try {
    const { title, content } = req.body;
    const upDateNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
      },
      { new: true },
    );
    if (!upDateNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json({ message: "notes updated succeessfully" });
  } catch {
    console.error("error in update controller", error);
    res.status(500).json({ message: "notes not updated successfully" });
  }
}

export async function DeleteNote(req, res) {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "note not found" });
      res.json({ message: "notes deleted successfully" });
    }
  } catch {
    console.error("error in delete controller", error);
    res.status(500).json({ message: "notes not deleted successfully" });
  }
  res.status(200).json({ message: "notes deleted successfully" });
}
