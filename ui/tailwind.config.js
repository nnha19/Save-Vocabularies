module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        2: "18rem 1fr",
      },
      height: {
        "90vh": "90vh",
        "2px": "2px",
        "95vh": "95vh",
        "40rem": "40rem",
        "90%": "90%",
      },
      width: {
        "30rem": "30rem",
      },
      colors: {
        backdrop: "#000000b0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
