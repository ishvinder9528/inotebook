import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
 
  return (
    <div className="App">
      <AuthState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert message="This is amazing" />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
