"use client";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTrackContext } from "@/lib/TrackContext";
import { useEffect, useState } from "react";

const Detail = ({ track }: { track: ITrackTop }) => {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!currentTrack?.isPlaying) {
      setPlaying(false);
    }
    if (currentTrack.isPlaying) {
      setPlaying(true);
    }
  }, [currentTrack]);
  return (
    <AccordionDetails>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>
          {track?.title} - {track?.uploader?.name || "Unknown"}
        </Typography>
        <IconButton
          color="primary"
          size="small"
          onClick={() => {
            setPlaying(!playing);
            setCurrentTrack({ ...track, isPlaying: !playing });
          }}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Box>
    </AccordionDetails>
  );
};

export default Detail;
