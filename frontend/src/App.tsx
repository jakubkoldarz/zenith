import "./App.css";
import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    autoHideDuration={3000}
                >
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
