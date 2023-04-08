import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 ">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h4 className="card-title">{note.title}</h4>
            <i className=" fa-regular fa-pen-to-square mx-2 "></i>
            <i className="fa-regular fa-trash-can mx-2"></i>
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
