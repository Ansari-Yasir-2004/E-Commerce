import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRegisteredUser,
  logoutCurrentUser,
  setCurrentUser,
} from "../ReduxManager/action";

const AuthManager = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const registeredUserList = useSelector((state) => state.registeredUser);

  useEffect(() => {
    const unsubscribe = handleAuthState();
    return () => unsubscribe();
  }, [dispatch, auth, registeredUserList]);

  const handleAuthState = () => {
    return onAuthStateChanged(auth, (user) => {
      console.log("Firebase User ==>", user);

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
      } else {
        dispatch(logoutCurrentUser());
      }
    });
  };

  return null;
};

export default AuthManager;
