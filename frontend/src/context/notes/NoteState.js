import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNote = [
    {
      _id: "642f2022e3c6d612c67de1219",
      user: "642ebd5c6d25b71c29575b6e",
      title: "Market",
      description: "buying something",
      tag: "Todo",
      createdAt: "2023-04-06T19:40:18.730Z",
      updatedAt: "2023-04-06T19:40:18.730Z",
      __v: 0,
    },
    {
      _id: "643036ac0c8b23f0664d5661b",
      user: "642ebd5c6d25b71c29575b6e",
      title: "going for Walk",
      description: "At 5pm we have to go to walk",
      tag: "Todo",
      createdAt: "2023-04-07T15:28:44.507Z",
      updatedAt: "2023-04-07T15:28:44.507Z",
      __v: 0,
    },{
        _id: "642f2022e3c6d632c67de1219",
        user: "642ebd5c6d25b71c29575b6e",
        title: "Market",
        description: "buying something",
        tag: "Todo",
        createdAt: "2023-04-06T19:40:18.730Z",
        updatedAt: "2023-04-06T19:40:18.730Z",
        __v: 0,
      },
      {
        _id: "643036ac0c8b3f06464d5661b",
        user: "642ebd5c6d25b71c29575b6e",
        title: "going for Walk",
        description: "At 5pm we have to go to walk",
        tag: "Todo",
        createdAt: "2023-04-07T15:28:44.507Z",
        updatedAt: "2023-04-07T15:28:44.507Z",
        __v: 0,
      },{
        _id: "642f2022e3c6d625c67de1219",
        user: "642ebd5c6d25b71c29575b6e",
        title: "Market",
        description: "buying something",
        tag: "Todo",
        createdAt: "2023-04-06T19:40:18.730Z",
        updatedAt: "2023-04-06T19:40:18.730Z",
        __v: 0,
      },
      {
        _id: "643036ac60c8b3f0664d5661b",
        user: "642ebd5c6d25b71c29575b6e",
        title: "going for Walk",
        description: "At 5pm we have to go to walk",
        tag: "Todo",
        createdAt: "2023-04-07T15:28:44.507Z",
        updatedAt: "2023-04-07T15:28:44.507Z",
        __v: 0,
      },{
        _id: "642f2022e3c86d62c67de1219",
        user: "642ebd5c6d25b71c29575b6e",
        title: "Market",
        description: "buying something",
        tag: "Todo",
        createdAt: "2023-04-06T19:40:18.730Z",
        updatedAt: "2023-04-06T19:40:18.730Z",
        __v: 0,
      },
      {
        _id: "643036ac0c8b3f06694d5661b",
        user: "642ebd5c6d25b71c29575b6e",
        title: "going for Walk",
        description: "At 5pm we have to go to walk",
        tag: "Todo",
        createdAt: "2023-04-07T15:28:44.507Z",
        updatedAt: "2023-04-07T15:28:44.507Z",
        __v: 0,
      },
  ];
  const [notes, setNotes] = useState(initialNote);

  // Add note
  const addNote = (note)=>{
    console.log("Adding a new note...");
    setNotes(notes.concat(note));
  }
  // Delete note
  const deleteNote = (note)=>{

  }
  // Edit note
  const editNote = (note)=>{

  }
  return (
    <NoteContext.Provider value={{ notes,setNotes, addNote,deleteNote,editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
