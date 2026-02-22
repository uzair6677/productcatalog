import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Axios from "axios";
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
      alert("please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title: Title,
        content: Content,
      });
      toast.success("Notes Created succeessfully");
      navigate("/");
    } catch (error) {
      console.error("create notes failed", error);
      if (error.response.status == 429) {
        toast.error(
          "you are creating notes too fast, please wait and try again",
          { duration: 4000, icon: "⏳" },
        );
        return;
      }

      toast.error("Failed to create Noteas");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"></ArrowLeftIcon>
            BacktoNotes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Notes</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text ">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered "
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="write your note here..."
                      className="textarea textarea-bordered h-32"
                      value={Content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary "
                      disabled={Loading}
                    >
                      {Loading ? "Creating..." : "Create-Note"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
