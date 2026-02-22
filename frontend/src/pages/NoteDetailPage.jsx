import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../libs/axios";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  const handleDelete = () => {};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoaderIcon className="size-14 text-primary animate-spin"></LoaderIcon>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to={"/"} className="btn btn-ghost">
            <ArrowLeftIcon className="size-5"></ArrowLeftIcon>
            Back to Notes
          </Link>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete Note
          </button>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
