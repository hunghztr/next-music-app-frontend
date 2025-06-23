import Like from "@/components/header/like/Like";
import authOptions from "@/utils/authOptions";
import { sendRequest } from "@/utils/fetchApi";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
export const metadata: Metadata = {
  title: "Sonix - Likes",
  description: "Trang Likes",
};
const LikePage = async () => {
  const session = await getServerSession(authOptions);
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
  if(resLikedTrack.status !== 200){
    console.log(resLikedTrack.message)
  }
  return <Like tracks={resLikedTrack.data || []} />;
};
export default LikePage;
