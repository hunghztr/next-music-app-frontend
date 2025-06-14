"use client";
import { useRenderByClient } from "@/utils/customHook";
import { AppBar, Box, Container } from "@mui/material";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Footer = () => {
  const hasMounted = useRenderByClient();
  if (!hasMounted) return <></>;
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          background: "#f2f2f2",
        }}
      >
        <Container sx={{ display: "flex", gap: "10px" }}>
          <H5AudioPlayer
            style={{ boxShadow: "unset" }}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/test.mp3`}
            volume={0.5}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="text-black">hello</div>
            <div className="text-black">hùng trần</div>
          </Box>
        </Container>
      </AppBar>
    </div>
  );
};
export default Footer;
