import React, { FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";

const ToastManager: FunctionComponent = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        position: "bottom-right",
        duration: 3000,
        className: "px-4 py-3 block-muted text-less-muted dark:bg-gray-950",
      }}
    />
  );
};

export default ToastManager;
