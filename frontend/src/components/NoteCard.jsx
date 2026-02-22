import { PenSquareIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../libs/utilis";
import api from "../libs/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //git rid of naigate behaior
    if (!window.confirm("are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("note deleted successfully");
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted note from state
    } catch (error) {
      console.error("error in deleting notes", error);
    }
  };
  return (
    <Link to={`/notes/${note.id}`}>
      <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF99]">
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-2">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <TrashIcon className="size-4"></TrashIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
