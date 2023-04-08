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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZWJkNWM2ZDI1YjcxYzI5NTc1YjZlIn0sImlhdCI6MTY4MDgwNTExMH0.nZNxVkocII3Z0AEqEVKx_LZLrKhy_r7b7svbLFHB1qA",
        },
      })

      let data = await response.json()
      // console.log(data);
      setNotes(data)

    } catch (error) {
      console.error("Error: " + error);
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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZWJkNWM2ZDI1YjcxYzI5NTc1YjZlIn0sImlhdCI6MTY4MDgwNTExMH0.nZNxVkocII3Z0AEqEVKx_LZLrKhy_r7b7svbLFHB1qA",
        },
        body: JSON.stringify(note)
      })

      let data = await response.json()

      setNotes(notes.concat(data));


    } catch (error) {
      console.error("Error: " + error);
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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZWJkNWM2ZDI1YjcxYzI5NTc1YjZlIn0sImlhdCI6MTY4MDgwNTExMH0.nZNxVkocII3Z0AEqEVKx_LZLrKhy_r7b7svbLFHB1qA",
        },
      })
      const newNote = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNote);
    } catch (error) {
      console.error("Error: " + error);
    }

  };

  // Edit note
  const editNote = async ( _id, title, description, tag ) => {
    
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZWJkNWM2ZDI1YjcxYzI5NTc1YjZlIn0sImlhdCI6MTY4MDgwNTExMH0.nZNxVkocII3Z0AEqEVKx_LZLrKhy_r7b7svbLFHB1qA",
        },
        body: JSON.stringify({ title, description, tag})
      })
      // const json = await response.json()
      // console.log(json);
      const newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        // eslint-disable-next-line no-cond-assign
        if (element._id === _id) {
          newNotes[index].title = title
          newNotes[index].description = description
          newNotes[index].tag = tag
          break
        }

      }
        setNotes(newNotes)

    } catch (error) {
      console.error("Error: " + error);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
