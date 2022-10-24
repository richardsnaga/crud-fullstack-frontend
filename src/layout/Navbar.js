import React from "react";
import { Link, useNavigate } from "react-router-dom";
import active_user from "../component/users";

export default function Navbar() {
  let navigate = useNavigate();
  const logout = () => {
    active_user.shift();
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Full Stack Application
          </Link>
          {active_user[0] && (
            <button
              className="btn btn-warning float-start mb-2"
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}
