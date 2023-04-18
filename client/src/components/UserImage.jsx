import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => { // UserImage is a component that displays a user's profile picture in a circle
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }} // style is an object that contains CSS properties
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;