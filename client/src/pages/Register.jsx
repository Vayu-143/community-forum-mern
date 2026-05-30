import { useState } from "react";
import { registerUser } from "../services/authService";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      alert(
        "Registration Failed"
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
                Register
              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control mb-3"
                  onChange={
                    handleChange
                  }
                />

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
                  className="btn btn-success w-100"
                  type="submit"
                >
                  Register
                </button>
              </form>

              <div className="mt-3 text-center">
                <Link to="/">
                  Already have account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;