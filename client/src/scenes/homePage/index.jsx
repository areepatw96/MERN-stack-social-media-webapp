import { Box, useMediaQuery } from "@mui/material";  // <-- Add this line to import useMediaQuery from @mui/material 
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar"; 
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget"; 
import PostsWidget from "scenes/widgets/PostsWidget"; 
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {  // <-- Add this line to import HomePage from scenes/homePage
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // <-- Add this line to use useMediaQuery hook to check if the screen is non-mobile 
  const { _id, picturePath } = useSelector((state) => state.user); // <-- Add this line to get the user's id and picture path from the redux store 

  return (
    <Box> 
      <Navbar /> 
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"} // <-- Add this line to check if the screen is non-mobile and set the display property accordingly
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>  
          <UserWidget userId={_id} picturePath={picturePath} /> 
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined} // <-- Add this line to set the flexBasis property to 42% if the screen is non-mobile
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} /> 
          <PostsWidget userId={_id} /> 
        </Box>
        {isNonMobileScreens && ( // <-- Add this line to check if the screen is non-mobile and render the widgets accordingly
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;