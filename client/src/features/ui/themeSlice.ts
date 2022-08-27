import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: false },
  reducers: {
    initTheme: (state) => {
      if (navigator.cookieEnabled && localStorage.theme === "dark") {
        document.documentElement.className = "dark";
        state.darkMode = true;
      } else {
        document.documentElement.className = "light";
        state.darkMode = false;
      }
    },
    toggleTheme: (state) => {
      const mode = !state.darkMode;
      state.darkMode = mode;
      const className = mode ? "dark" : "light";

      if (navigator.cookieEnabled) {
        localStorage.theme = className;
      }

      document.documentElement.className = className;
    }
  }
});

export const { toggleTheme, initTheme } = themeSlice.actions;
