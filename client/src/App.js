import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";  // Import the router
import HomePage from "scenes/homePage"; // Import the home page
import LoginPage from "scenes/loginPage"; // Import the login page
import ProfilePage from "scenes/profilePage"; // Import the profile page
import { useMemo } from "react"; // Import useMemo to memoize the theme 
import { useSelector } from "react-redux"; // Import useSelector to get the mode from the store
import { CssBaseline, ThemeProvider } from "@mui/material"; // Import the theme provider and the css baseline 
import { createTheme } from "@mui/material/styles"; // Import createTheme to create the theme
import { themeSettings } from "./theme"; // Import the theme settings  

function App() { // Create the app component 
  const mode = useSelector((state) => state.mode); // Get the mode from the store 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Create the theme 
  const isAuth = Boolean(useSelector((state) => state.token)); // Get the token from the store 

  return ( // Return the app component 
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App; // Export the app component
