import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../libs/axios";

const Create = () => {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Title.trim() || !Content.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/notes", {
        title: Title,
        content: Content,
      });

      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.error("create notes failed", error);

      if (error?.response?.status === 429) {
        toast.error(
          "You are creating notes too fast, please wait and try again",
          { duration: 4000, icon: "⏳" },
        );
        return;
      }

      toast.error("Failed to create notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Top bar (same as detail page) */}
          <div className="flex items-center justify-between">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title card */}
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Content card */}
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full resize-none"
                    rows={6}
                    value={Content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Save button (same position as detail page) */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={Loading}
              >
                {Loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
