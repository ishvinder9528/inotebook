import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const s1 = {
        name: "ishu",
        age: "22",
    };
    const [state, setState] = useState(s1);
    const updateState = () => {
        setTimeout(() => {
            setState({
                name: "Simran",
                age: "23",
            });
        }, 2000);
    };
    return (
        <NoteContext.Provider value={{state,updateState}}>{props.children}</NoteContext.Provider>
    );
};

export default NoteState;
