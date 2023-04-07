import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  useEffect(() => {
    a.updateState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const a = useContext(NoteContext);

  return (
    <div>
      About user = {a.state.name} age={a.state.age}
    </div>
  );
};

export default About;
