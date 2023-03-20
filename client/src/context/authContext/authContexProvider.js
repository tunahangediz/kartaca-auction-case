import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useReducer } from "react";

import { authReducer } from "./authReducer";
export const authContext = createContext();

const initialState = {
  user: "",
  isAuthReady: false,
};

function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const authReady = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users/login", {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch({
            type: "SET_AUTH_READY",
            payload: res.data.data.user,
          });
          console.log("auth ready");
        }
      } catch (error) {
        dispatch({
          type: "SET_AUTH_READY",
          payload: null,
        });
      }
    };
    authReady();
  }, []);

  const handleLogout = async () => {
    const response = await axios.delete("http://localhost:4000/users/logout", {
      withCredentials: true,
    });

    dispatch({ type: "LOGOUT" });
  };

  return (
    <authContext.Provider value={{ ...authState, dispatch, handleLogout }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
