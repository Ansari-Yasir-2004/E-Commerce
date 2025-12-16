import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, logoutCurrentUser } from "../ReduxManager/action";
import { useFirebase } from "../context/Firebase";

const Profile = () => {
  const dipatch = useDispatch();
  const firebase = useFirebase();

  return (
    <div>
      <Container>
        <div className="custom-bread mt-4">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / Profile
        </div>
        <div className="h2 mt-4">Profile Page</div>
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            firebase
              .logout()
              .then(() => {
                dipatch(logoutCurrentUser());
                // dipatch(clearCart());
              })
              .catch((error) => {
                console.log("Logout Error ===>", error);
              });
          }}
        >
          Logout
        </button>
      </Container>
    </div>
  );
};

export default Profile;
