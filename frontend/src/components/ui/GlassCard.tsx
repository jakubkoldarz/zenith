import { styled, useTheme } from "@mui/material/styles";
import { Card, Paper } from "@mui/material";

export const GlassCard = styled(Card)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0)",

    backdropFilter: "blur(12px)",

    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",

    borderRadius: 4,
    overflow: "hidden",
}));
