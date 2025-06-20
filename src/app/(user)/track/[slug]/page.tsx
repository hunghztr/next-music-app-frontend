
import WaveTrack from "@/components/track/WaveTrack";
import {Container} from "@mui/material";
import {sendRequest} from "@/utils/fetchApi";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const DetailTrackPage = async ({params}:{params:Promise<{slug:string}>}) => {
    const param = await params

    const session = await getServerSession(authOptions)
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/get-id/${param.slug}`,
        method: "GET",
    })
    const resComment = await sendRequest <IBackendRes<IPage<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/get-by-track`,
        method: "POST",
        queryParams:{
            trackId:param.slug,
        }
    })
    const resLikedTrack = await sendRequest<IBackendRes<ITrackTop[]>>({
        url:`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`,
        method:'GET',
        queryParams:{
            current:1,
            pageSize:10,
        },
        headers:{
            "Authorization": `Bearer ${session?.accessToken}`,
        }
    })
  return (
    <div>
      <div>
          <Container sx={{background:"linear-gradient(136deg, rgb(106,112,67) 0%, rgb(11,15,20) 100%)",height:'400px',width:'100%'}}>
              <WaveTrack resLikedTrack={resLikedTrack.data||null} track={res.data || null} comments={resComment.data?.result || null}/>
          </Container>

      </div>
    </div>
  );
};
export default DetailTrackPage;
