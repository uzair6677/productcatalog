import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";

import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../libs/axios";
import NotesNotFound from "../components/NotesNotFound";

const Home = () => {
  const [isRateLimited, isSetRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");

        setNotes(res.data);
        isSetRateLimited(false);
        setIsLoading(false);
      } catch (error) {
        console.log("error while fetching Notes", error);
        if (error.response?.status === 429) {
          isSetRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-primary text-center py-10">loading...</div>
        )}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
