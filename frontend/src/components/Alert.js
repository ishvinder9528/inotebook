import React, { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import NoteContext from "../context/notes/NoteContext";

const Alert = () => {

  const { alert: noteAlert } = useContext(NoteContext);
  const { alert: authAlert } = useContext(AuthContext);
  
  const capitalize = (word) => {
    console.log('word:', word); // add this line to see what the value of `word` is
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  
  return (
    <div style={{ height: "50px" }}>
      {(noteAlert && noteAlert.type) || (authAlert && authAlert.type)  ? (
        <div
          className={`alert alert-${
            noteAlert ? noteAlert.type : authAlert.type
          } alert-dismissable fade show`}
          role="alert"
        >
          <strong>
            {capitalize(noteAlert ? noteAlert.type : authAlert.type)}
          </strong>
          : {noteAlert ? noteAlert.msg : authAlert.msg}
        </div>
      ) : null}
    </div>
  );
};

export default Alert;
