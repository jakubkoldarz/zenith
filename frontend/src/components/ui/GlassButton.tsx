import { styled, useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

export const GlassButton = styled(Button)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.18)",

    backdropFilter: "blur(12px)",

    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",

    borderRadius: 4,
    overflow: "hidden",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
    },
}));
