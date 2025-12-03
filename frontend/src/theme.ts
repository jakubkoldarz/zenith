import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#4f03ffff",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#06b6d4",
        },

        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },

        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },
    },

    typography: {
        fontFamily: '"Inter", sans-serif',

        h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "-0.02em" },
        h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        button: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "0.05em" }, // Przyciski też kosmiczne!
    },
});
