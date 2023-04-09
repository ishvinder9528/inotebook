import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNote = [];
  const [notes, setNotes] = useState(initialNote);
  const host = "http://localhost:5000";

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      let data = await response.json();
      // console.log(data);
      setNotes(data);
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Add note
  const addNote = async (note) => {
    // TODO => add api

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      let data = await response.json();

      setNotes(notes.concat(data));
      showAlert("Note Added !", "success");
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    // TODO => add api
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const newNote = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNote);
      showAlert("Note Deleted ", "success");
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };

  // Edit note
  const editNote = async (_id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      // const json = await response.json()
      // console.log(json);
      const newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        // eslint-disable-next-line no-cond-assign
        if (element._id === _id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      showAlert("Note Updated Successfully", "success");
    } catch (error) {
      showAlert("Opps, Something went wrong", "danger");
    }
  };
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        alert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
