import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Detail from "@/components/header/playlist/DetailPlaylist";

const Playlist = ({ playlists }: { playlists: IPlaylist[] | undefined }) => {
  return (
    <div>
      {playlists?.map((i) => {
        return (
          <Accordion key={i.id}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                component="span"
                sx={{ fontSize: "1.3vw", fontWeight: "bold" }}
              >
                {i.title}
              </Typography>
            </AccordionSummary>
            {i.tracks.map((t) => (
              <Detail key={t?.id} track={t} />
            ))}
          </Accordion>
        );
      })}
    </div>
  );
};
export default Playlist;
