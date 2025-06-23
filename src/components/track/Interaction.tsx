"use client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Chip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetchApi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddToPlaylist from "@/components/track/AddToPlayList";
import AlertInfo from "@/components/alert/AlertInfo";

const Interaction = ({ track }: { track: IShareTrack | null }) => {
  const { data: session } = useSession();
  const route = useRouter();
  const [liked, setLiked] = useState(false);
  const [exist, setExist] = useState<boolean | undefined>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [openMessage, setOpenMessage] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const [playlists, setPlaylists] = useState<IPlaylist[]>();
  useEffect(() => {
    const fetch = async () => {
      const res = await sendRequest<IBackendRes<IPage<IPlaylist>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists/by-user`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      return res.status === 200
        ? setPlaylists(res.data?.result || [])
        : console.log(res.message);
    };
    fetch();
  }, [session?.accessToken]);
  const handleSelectPlaylist = async (playlist: IPlaylist) => {
    const res = await sendRequest<IBackendRes<IPlaylist>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists`,
      method: "PUT",
      body: {
        id: playlist.id,
        title: playlist.title,
        isPublic: playlist.isPublic,
        trackIds: [track?.id],
      },
    });
    if (res.status === 200) {
      setOpenMessage(true);
      setResMessage("Thêm vào playlist thành công");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const resLikedTrack = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`,
        method: "GET",
        queryParams: {
          current: 1,
          pageSize: 10,
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      setExist((resLikedTrack.data || [])?.some((i) => i.id === track?.id));
    };
    fetch();
  }, [track]);
  useEffect(() => {
    if (exist) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [track, liked, exist]);
  const handleInteract = async () => {
    const res = await sendRequest<IBackendRes<string>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`,
      method: "POST",
      queryParams: {
        trackId: track?.id,
        isLike: liked ? 0 : 1,
      },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (res.status === 200) {
      route.refresh();
    } else {
      console.log(res.message);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <IconButton
        color={liked ? "error" : "default"}
        onClick={() => {
          handleInteract();
        }}
      >
        <FavoriteIcon />
      </IconButton>

      <div className="flex gap-2">
        <Chip
          label={track?.countLike}
          variant="outlined"
          icon={<FavoriteIcon sx={{ color: "red" }} />}
        />
        <Chip
          label={track?.countPlay}
          variant="outlined"
          icon={<VisibilityIcon />}
        />
        <IconButton
          size="medium"
          color={"default"}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <PlaylistAddIcon />
        </IconButton>
      </div>
      <AddToPlaylist
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        playlists={playlists || []}
        onSelect={handleSelectPlaylist}
      />
      <AlertInfo
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
        resMessage={resMessage}
      />
    </div>
  );
};

export default Interaction;
