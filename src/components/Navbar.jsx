import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="d-flex justify-content-between mt-4">
      <div className="nav-left">
        <ul className="nav-links-left d-flex">
          <li>
            <Link className="nav-left-items">TV & Video</Link>
          </li>
          <li>
            <Link className="nav-left-items">Home Audio & Theater</Link>
          </li>
          <li>
            <Link className="nav-left-items">Camera, Photo & VideoCell</Link>
          </li>
          <li>
            <Link className="nav-left-items">Phones & Accessories</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <ul className="nav-links-right d-flex">
          <li>
            <Link className="nav-right-items">Flash Deals</Link>
          </li>
          <li>
            <Link className="nav-right-items">Tech Discovery</Link>
          </li>
          <li>
            <Link className="nav-right-items">Trending Styles</Link>
          </li>
          <li>
            <Link className="nav-right-items">Gift Cards</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
