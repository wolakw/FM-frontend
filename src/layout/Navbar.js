import React from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to={"/"}>
            <a className="navbar-brand" >
              Football Manager
            </a>
          </Link>

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
          <Link to={"/add-user"}>
            <button className="btn btn-outline-light">Add User</button>
          </Link>

        </div>
      </nav>
    </div>
  );
}
