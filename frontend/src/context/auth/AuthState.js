import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const host = "http://localhost:5000";
  const [token, setToken] = useState(false);
    const[isSigned, setIsSigned] = useState(false);
  //   For Login page
  const loggedIn = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log(json.authToken);

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        setToken(true);
      } else {
        alert("Invalid Credentials. Please try again");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //   For SignUp page
  const signUp = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        alert("signup successful")
        setIsSigned(true)
      } else {
        alert("Invalid Credentials. Please try again");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, signUp, token, isSigned }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
