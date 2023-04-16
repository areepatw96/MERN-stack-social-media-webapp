import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored posts
        </Typography>
        <a href="http://example.com/create-ad">
          <Typography color={medium}>Create Ad</Typography>
        </a>
      </FlexBetween>
      <a href="http://example.com/advert-1">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:3001/assets/chanel.jpg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </a>
      <FlexBetween>
        <Typography color={main}>Rare Beauty</Typography>
        <a href="http://example.com/rare-beauty">
          <Typography color={medium}>https://unsplash.com/s/photos/lipstick</Typography>
        </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
      
      <a href="http://example.com/advert-2">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:3001/assets/chanel.jpg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </a>
      <FlexBetween>
        <Typography color={main}>Nike</Typography>
        <a href="http://example.com/nike">
          <Typography color={medium}>nike.com</Typography>
        </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Just Do It. Shop the latest shoes, clothing and accessories from Nike.
      </Typography>
      
      <a href="http://example.com/advert-3">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:3001/assets/chanel.jpg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </a>
      <FlexBetween>
        <Typography color={main}>Chanel</Typography>
        <a href="http://example.com/apple">
          <Typography color={medium}>chanel.com</Typography>
        </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Introducing the iPhone 13 Pro and iPhone 13. With breakthrough camera
        systems and the best battery life ever in an iPhone.
      </Typography>
    </WidgetWrapper>



  );
};

export default AdvertWidget;