import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "General",
  });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      _id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

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
    if (note.edescription.length > 5 && note.etitle.length > 3) {
      editNote(note._id, note.etitle, note.edescription, note.etag);
      setNote({
        etitle: "",
        edescription: "",
        etag: "General",
      });
      refClose.current.click();
    }
  };

  return (
    <>
      <AddNote />

      {/* modal */}
      <div>
        <button
          type="button"
          ref={ref}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={refClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 my-4 container">
                    <h5>
                      <label htmlFor="etitle" className="form-label ">
                        Title
                      </label>
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      name="etitle"
                      id="etitle"
                      value={note.etitle}
                      onChange={onChange}
                      minLength={3}
                      required
                    />
                  </div>
                  <div className=" my-4 mb-3 container">
                    <h5>
                      <label htmlFor="edescription" className="form-label ">
                        Description
                      </label>
                    </h5>
                    <textarea
                      type="text"
                      className="form-control"
                      value={note.edescription}
                      name="edescription"
                      id="edescription"
                      rows="3"
                      onChange={onChange}
                      onKeyDown={handleKeyDown}
                      minLength={5}
                      required
                    />

                    <h5>
                      <label htmlFor="etag" className="form-label my-4 mb-3">
                        Tag
                      </label>
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      value={note.etag}
                      name="etag"
                      id="etag"
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={
                    note.edescription.length < 5  || note.etitle.length < 3
                  }
                >
                  Modify Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note Items */}
      <div className="my-5 ">
        <h2>Your Notes </h2>
        <div className="row my-3 container mx-2 ">
          {notes.length < 1 && "No Notes to Display"}
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
