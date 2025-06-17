"use client";

import WaveTrack from "@/components/track/WaveTrack";
import {Container} from "@mui/material";

const DetailTrackPage = () => {
  return (
    <div>
      <div>
          <Container sx={{background:"linear-gradient(136deg, rgb(106,112,67) 0%, rgb(11,15,20) 100%)",height:'400px',width:'100%'}}>
              <WaveTrack />
          </Container>

      </div>
    </div>
  );
};
export default DetailTrackPage;
