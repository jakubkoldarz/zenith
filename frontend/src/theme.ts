import { createTheme } from "@mui/material/styles";
import { Extend } from "zod/v4/core/util.cjs";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#6c1ef4ff",
            light: "#5928ecff",
            dark: "#5b21b6",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#1565C0",
            contrastText: "#ffffff",
        },

        background: {
            default: "#0f0f15",
            paper: "#18181b",
        },

        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },

        error: {
            main: "#ef4444",
        },
        success: {
            main: "#10b981",
        },

        roles: {
            owner: "#6200EA",
            editor: "#2962FF",
            viewer: "#00695C",
        },

        glass: {
            background: "rgba(255, 255, 255, 0.09)",
            text: "rgba(255, 255, 255, 0.8)",
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

        button: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "0.05em" },
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        glass: {
            background: string;
            text: string;
        };

        roles: {
            owner: string;
            editor: string;
            viewer: string;
        };
    }

    interface PaletteOptions {
        glass?: {
            background?: string;
            text?: string;
        };

        roles?: {
            owner?: string;
            editor?: string;
            viewer?: string;
        };
    }
}
