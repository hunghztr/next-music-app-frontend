import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TextField from "@mui/material/TextField";
import CommentCard from "@/components/track/CommentCard";
import { sendRequest } from "@/utils/fetchApi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
dayjs.extend(relativeTime);
const CommentTrack = ({
  track,
  comments,
  wave,
  setPlay,
}: {
  track: IShareTrack | null;
  comments: ITrackComment[] | null;
  wave: any;
  setPlay: (v: boolean) => void;
}) => {
  const route = useRouter();
  const { data: session } = useSession();
  const [mess, setMess] = useState<string>("");
  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const res = await sendRequest<IBackendRes<ITrackComment>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`,
        method: "POST",
        body: {
          content: mess,
          moment: Math.round(wave?.getCurrentTime() ?? 0),
          track: {
            id: track?.id,
          },
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (res.status === 200) {
        setMess("");
        route.refresh();
      }
    }
  };
  const handleJump = (moment: number) => {
    const duration = wave.getDuration();
    wave.seekTo(moment / duration);
    wave.play();
    setPlay(true);
  };
  return (
    <div className="mt-4">
      <TextField
        fullWidth
        label="Comment"
        onKeyDown={handlePressEnter}
        value={mess}
        onChange={(e) => setMess(e.target.value)}
      />
      <div className="flex gap-12 mt-6">
        <div>
          <Image
            className="border ring-1 rounded-full"
            src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${
              track?.uploader.avatar || "user.png"
            }`}
            alt="Avatar"
            width={200}
            height={200}
          />
          <p className="object-cover mt-6 font-bold text-[1.3vw] text-center">
            {track?.uploader?.name || "Unknown user"}
          </p>
        </div>
        <div className="w-full">
          {comments &&
            comments.map((i) => (
              <CommentCard key={i.id} handleJump={handleJump} comment={i} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default CommentTrack;
