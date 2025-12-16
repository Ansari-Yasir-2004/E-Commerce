import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, useFirebase } from "../context/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { addRegisteredUser, setCurrentUser } from "../ReduxManager/action";

const SignIn = () => {
  const firebase = useFirebase();
  console.log(firebase);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const dispatch = useDispatch();
  const registeredUserList = useSelector((state) => state.registeredUser);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = () => {
    if (!userEmail || !userPassword) {
      alert("Please fill both fields.");
      return;
    }

    console.log("Signing in with:", userEmail, userPassword);

    firebase
      .signInUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userData = {
            email: user.email,
            id: user.uid,
            accessToken: user.accessToken,
          };

          dispatch(setCurrentUser(userData));

          const UserExist = registeredUserList.find(
            (detail) => detail.id === user.uid
          );
          if (!UserExist) {
            dispatch(addRegisteredUser(userData));
          } else {
            console.log("User Already Exist ===>", UserExist);
          }
        }
        console.log("User signed in:", userCredential.user);
        alert("Login successful!");
        setUserEmail("");
        setUserPassword("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log("Error ===>", error);
        setUserEmail("");
        setUserPassword("");

        if (error.code === "auth/user-not-found") {
          alert("User does not exist. Please sign up.");
        } else if (error.code === "auth/wrong-password") {
          alert("Incorrect password.");
        } else if (error.code === "auth/invalid-credential") {
          alert("Invalid credentials. Did you have an account ?");
        } else {
          alert("Error: " + error.message);
        }
      });
  };

  return (
    <div>
      <Container>
        <div className="custom-bread mt-4">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / Sign In Page
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "calc(100vh - 210px)" }}
        >
          <div className="p-3 border rounded-3 d-flex flex-column">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                autoFocus
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                value={userEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                value={userPassword}
              />
            </Form.Group>
            <button
              className="btn btn-success mx-auto"
              onClick={() => {
                // firebase.signUpUserWithEmailAndPassword(
                //   userEmail,
                //   userPassword
                // );
                // firebase.putData("users/email", {
                //   userEmail,
                //   userPassword,
                // });
                handleSignIn();
              }}
            >
              Sign In
            </button>
            <p className="m-0 mt-2">
              Don't have an account ? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
