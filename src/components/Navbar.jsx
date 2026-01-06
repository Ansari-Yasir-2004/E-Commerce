import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="font-geologica fw-500 border-black-light-4 border-start-0 border-end-0 d-flex justify-content-between mt-4">
      <div className="nav-left">
        <ul className="nav-links-left d-flex">
          <li className="position-relative">
            <Link className="nav-left-items d-inline-block text-black-light-2">TV & Video</Link>
          </li>
          <li className="position-relative">
            <Link className="nav-left-items d-inline-block text-black-light-2">Home Audio & Theater</Link>
          </li>
          <li className="position-relative">
            <Link className="nav-left-items d-inline-block text-black-light-2">Camera, Photo & VideoCell</Link>
          </li>
          <li className="position-relative">
            <Link className="nav-left-items d-inline-block text-black-light-2">Phones & Accessories</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right primary-linear-gradient">
        <ul className="nav-links-right d-flex">
          <li className="position-relative">
            <Link className="nav-right-items d-inline-block text-white">Flash Deals</Link>
          </li>
          <li className="position-relative">
            <Link className="nav-right-items d-inline-block text-white">Tech Discovery</Link>
          </li>
          <li className="position-relative">
            <Link className="nav-right-items d-inline-block text-white">Trending Styles</Link>
          </li>
          <li className="position-relative">
            <Link className="nav-right-items d-inline-block text-white">Gift Cards</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
