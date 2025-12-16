import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useFirebase } from "../context/Firebase";
import { useDispatch, useSelector } from "react-redux";

const SignUpPage = () => {
  const firebase = useFirebase();
  console.log("Firebasr", firebase);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errormsg, setErrorMsg] = useState("");

  const handleSignUp = () => {
    if (!userEmail || !userPassword) {
      alert("Please fill both fields.");
      return;
    }

    firebase
      .signUpUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        alert("Login successful!");
        setUserEmail("");
        setUserPassword("");
        navigate("/profile"); // navigate to profile page
      })
      .catch((error) => {
        console.error("Sign-in Error:", error.code, error.message);
        if (error.code === "auth/user-not-found") {
          alert("No user found. Please sign up first.");
          setUserEmail("");
          setUserPassword("");
        } else if (error.code === "auth/wrong-password") {
          alert("Incorrect password.");
          setUserEmail("");
          setUserPassword("");
        } else {
          alert(error.message);
          setUserEmail("");
          setUserPassword("");
        }
      });
    // .catch((error) => {
    //   console.log("Error ==>", error);
    //   if (error.code === "auth/email-already-in-use") {
    //     setErrorMsg("Email already in use. Please sign in.");
    //     alert(errormsg);
    //   } else {
    //     setErrorMsg(error.message);
    //     alert(errormsg);
    //   }
    // });
  };

  return (
    <div>
      <Container>
        <div className="custom-bread mt-4">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / Sign Up Page
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
            <div className="d-flex gap-1">
              <button
                className="btn btn-success mx-auto"
                onClick={() => {
                  handleSignUp();
                }}
              >
                Sign up
              </button>
              {/* <button
                className="btn btn-success mx-auto"
                onClick={() => {
                  firebase
                    .signUpWithGoogle()
                    .then((value) => {
                      const user = value.user;
                      console.log(user);
                      const userDisplayName = user.displayName;
                      const userEmail = user.email;
                      const userId = user.uid;

                      const userCredentialObject = {
                        displayName: userDisplayName,
                        email: userEmail,
                        id: userId,
                      };

                      const userExist = userCredentialDataSelector.find(
                        (detail) => detail.id === userId
                      );
                      if (!userExist) {
                        dispatch(setUserCredential(userCredentialObject));
                      } else {
                        console.log("User Already Exist ===>", userExist);
                        // alert("User Already Exist");
                      }

                      const userAccesToken = user.accessToken;
                      console.log(userAccesToken);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  setUserEmail("");
                  setUserPassword("");
                }}
              >
                Google Sign up
              </button> */}
            </div>
            <p className="m-0 mt-2">
              Already have an account ? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
