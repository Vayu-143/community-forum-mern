import {
  useState,
  useContext,
} from "react";

import {
  loginUser,
} from "../services/authService";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useContext(
      AuthContext
    );

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await loginUser(
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        localStorage.setItem(
          "name",
          res.data.user.name
        );

        login(
          res.data.user
        );

        navigate(
          "/dashboard"
        );
      } catch (
        error
      ) {
        alert(
          "Invalid Credentials"
        );
      }
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  onChange={
                    handleChange
                  }
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </form>

              <div className="mt-3 text-center">
                <Link to="/register">
                  Create Account
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;