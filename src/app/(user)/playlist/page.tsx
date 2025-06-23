import Container from "@mui/material/Container";
import Playlist from "@/components/header/playlist/Playlist";
import { sendRequest } from "@/utils/fetchApi";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import AddPlaylist from "@/components/header/playlist/AddPlaylist";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sonix - Playlists",
  description: "Trang Playlists",
};
const PlaylistPage = async () => {
  const session = await getServerSession(authOptions);
  const res = await sendRequest<IBackendRes<IPage<IPlaylist>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists/by-user`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return (
    <Container sx={{ marginTop: "20px" }}>
      <AddPlaylist />
      <Playlist playlists={res.data?.result} />
    </Container>
  );
};
export default PlaylistPage;
