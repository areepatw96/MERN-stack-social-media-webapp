import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"; // import useMediaQuery from @mui/material
import Form from "./Form"; // import Form from ./Form (client\src\scenes\loginPage\Form.jsx)

const LoginPage = () => { 
  const theme = useTheme(); // useTheme from @mui/material (client\src\scenes\loginPage\index.jsx)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // useMediaQuery from @mui/material (client\src\scenes\loginPage\index.jsx)
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt} 
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Connectopia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // if isNonMobileScreens is true, then the width is 50%, otherwise it is 93%
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Connectopia!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;