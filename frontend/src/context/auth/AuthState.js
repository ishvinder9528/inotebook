import  { useState } from 'react'
import AuthContext from "./AuthContext";
const AuthState = (props) => {
    const [token,setToken]= useState(false) 
  const loggedIn = async (email, password) => {
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
        setToken(true)
      } else {
        alert("Invalid Credentials. Please try again");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn , token }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
