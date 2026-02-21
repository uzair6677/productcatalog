import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import NoteDetailPage from "./pages/NoteDetailPage";
// import toast from "react-hot-toast";

const App = () => {
  return (
    <div>
      <div>
        <button className="btn btn-primary">click me</button>
      </div>
      {/* <button
        onClick={() => toast.error("congrats ")}
        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
      >
        Click me
      </button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
