import React from "react";
import {Link} from "react-router-dom";

export default function Navbar_old() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to={"/"}>
            <a className="navbar-brand" >
              Football Manager
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
