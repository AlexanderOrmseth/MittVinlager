/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        xxs: "0 1px 1px #0000000f",
      },
      colors: {
        "slate-25": "#fbfcfd",
        "wine-25": "#fffafa",
        "wine-50": "#eed2d7",
        "wine-100": "#dda5af",
        "wine-200": "#d48f9b",
        "wine-300": "#c36272",
        "wine-400": "#b2354a",
        "wine-500": "#a91f36",
        "wine-600": "#87192b",
        "wine-700": "#651320",
        "wine-800": "#440c16",
        "wine-900": "#22060b",
        "b-darg-500": "#2E2E3A",
        "success-500": "#04A777",
        "another-green-wine-500": "#04A777",

        "blue-wine-light": "#7296DA",
        "blue-wine-25": "#dee6f5",
        "blue-wine-100": "#7685a1",
        "blue-wine-200": "#5f7092",
        "blue-wine-300": "#485c82",
        "blue-wine-400": "#314773",
        "blue-wine-500": "#1a3363",
        "blue-wine-600": "#172e59",
        "blue-wine-700": "#15294f",
        "blue-wine-800": "#101f3b",
        "blue-wine-900": "#0a1428",

        "green-wine-25": "#f4f7f7",
        "green-wine-50": "#e8efef",
        "green-wine-100": "#dae5e6",
        "green-wine-300": "#487e82",
        "green-wine-500": "#1A5E63",
        "green-wine-600": "#154b4f",
      },
    },
  },
  plugins: [],
};
