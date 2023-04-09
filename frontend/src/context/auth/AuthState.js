import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const host = "http://localhost:5000";
  const [token, setToken] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
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
    //   console.log(json.authToken);

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        setToken(true);
        showAlert('Successfully logged in', "success");
      } else {
        showAlert("Invalid Credentials. Please try again", "danger");
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
        setIsSigned(true);
        showAlert("Account Created Successfully", "success");
      } else {
        showAlert("Invalid Details or Email already Registered", "danger");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    console.log('showAlert:', message, type); // add this line to check the parameters
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  



  return (
    <AuthContext.Provider value={{ loggedIn, signUp, token,setToken, isSigned,showAlert, alert }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
