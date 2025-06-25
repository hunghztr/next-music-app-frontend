import TrackList from "@/components/admin/track/TrackList";
import authOptions from "@/utils/authOptions";
import { sendRequest } from "@/utils/fetchApi";
import { getServerSession } from "next-auth";

const TrackPage = async () => {
  const session = await getServerSession(authOptions);
  const res = await sendRequest<IBackendRes<IPage<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (res.status !== 200) {
    console.log("error ", res.message);
  }
  return <TrackList />;
};
export default TrackPage;
