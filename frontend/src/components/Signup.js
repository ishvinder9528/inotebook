import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
const Signup = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { signUp, isSigned } = context;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    if (isSigned) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSigned]);

  const handleSubmit = (e) => {
    e.preventDefault();
      signUp(credentials.name, credentials.email, credentials.password);
      setCredentials({ name: "", email: "", password: "", cpassword: "" });
    
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "10px",
                }}
              >
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                  <h2 className="mb-0">Sign Up</h2>
                </div>

                {/* <!-- Name input --> */}
                <label className="form-label " htmlFor="name">
                  Name
                </label>
                <div className="form-outline mb-4">
                  <input
                    type="name"
                    id="name"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid name"
                    name="name"
                    onChange={onChange}
                    value={credentials.name}
                    required
                    minLength={3}
                  />
                </div>

                {/* <!-- Email input --> */}
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    name="email"
                    onChange={onChange}
                    value={credentials.email}
                    required
                  />
                </div>

                {/* <!-- Password input --> */}
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    name="password"
                    onChange={onChange}
                    value={credentials.password}
                    required
                  />
                </div>

                {/* <!-- Confirm Password input --> */}
                <label className="form-label" htmlFor="password">
                  Confirm Password
                </label>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="cpassword"
                    className="form-control form-control-lg"
                    placeholder="Enter confirm password"
                    name="cpassword"
                    onChange={onChange}
                    value={credentials.cpassword}
                    required
                  />
                </div>

                <div className="text-center text-lg-start mt-2 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    disabled={
                      credentials.cpassword.length === 0 ||
                      credentials.password.length === 0 ||
                      credentials.cpassword !== credentials.password ||
                      credentials.name.length < 3
                    }
                  >
                    Sign Up
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-light text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 iNotebook
        </div>
      </footer>
    </div>
  );
};

export default Signup;
