
import WaveTrack from "@/components/track/WaveTrack";
import {Container} from "@mui/material";
import {sendRequest} from "@/utils/fetchApi";

const DetailTrackPage = async ({params}:{params:any}) => {

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/get-id/${params.slug}`,
        method: "GET",
    })

  return (
    <div>
      <div>
          <Container sx={{background:"linear-gradient(136deg, rgb(106,112,67) 0%, rgb(11,15,20) 100%)",height:'400px',width:'100%'}}>
              <WaveTrack track={res.data || null}/>
          </Container>

      </div>
    </div>
  );
};
export default DetailTrackPage;
