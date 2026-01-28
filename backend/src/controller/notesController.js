export function getAllNotes(req, res) {
  res.status(200).send("you got 10 rating");
}

export function CreateNote(req, res) {
  res.status(201).json({ message: "notes created succeessfully" });
}

export function UpdateNote(req, res) {
  res.status(200).json({ message: "notes updated succeessfully" });
}

export function DeleteNote(req, res) {
  res.status(200).json({ message: "notes deleted succeessfully" });
}
