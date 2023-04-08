import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 ">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h4 className="card-title">{note.title}</h4>
            <i className=" fa-regular fa-pen-to-square mx-2 " onClick={() => { updateNote(note) }} ></i>
            <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
          </div>
          <h5 className="card-subtitle my-1 mx-3 text-body-secondary">
            {note.description}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
