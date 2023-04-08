import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.description.length > 5 && note.title.length > 3) {
      addNote(note);
      setNote({
        title: "",
        description: "",
        tag: "General",
      });
    } 
  };
  return (
    <div className="container my-3">
      <h2>Add a Task </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-4 container">
          <h5>
            <label htmlFor="title" className="form-label ">
              Title
            </label>
          </h5>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            value={note.title}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className=" my-4 mb-3 container">
          <h5>
            <label htmlFor="description" className="form-label ">
              Description
            </label>
          </h5>
          <textarea
            type="text"
            className="form-control"
            value={note.description}
            name="description"
            id="description"
            rows="3"
            onChange={onChange}
            onKeyDown={handleKeyDown}
            minLength={5}
            required
          />

          <h5>
            <label htmlFor="tag" className="form-label my-4 mb-3">
              Tag
            </label>
          </h5>
          <input
            type="text"
            className="form-control"
            value={note.tag}
            name="tag"
            id="tag"
            onChange={onChange}
          />
        </div>
        <div className="container">
          <button
            type="submit"
            disabled={note.description.length < 5 || note.title.length < 3}
            className=" btn btn-primary  my-2"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
