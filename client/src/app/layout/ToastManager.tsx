import React, { FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "../store/configureStore";


const ToastManager: FunctionComponent = () => {

  const { darkMode } = useAppSelector(state => state.theme);
  console.log("lol");
  return (
    <Toaster position="top-center" reverseOrder={false} toastOptions={{
      style: {
        borderRadius: "10px",
        background: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#222"
      }
    }} />);
};

export default ToastManager;
