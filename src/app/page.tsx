import MainSlider from "@/components/main/MainSlider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/fetchApi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
export default async function Home() {
  // const session = await getServerSession(authOptions);
  const chillRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8080/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: 10 },
  });
  const workoutRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8080/api/v1/tracks/top",
    method: "POST",
    body: { category: "WORKOUT", limit: 10 },
  });
  const partyRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8080/api/v1/tracks/top",
    method: "POST",
    body: { category: "PARTY", limit: 10 },
  });
  return (
      <div>

    <Container>
      <MainSlider title={"Top Chill"} data={chillRes?.data || []} />
      <MainSlider title={"Top Workout"} data={workoutRes?.data || []} />
      <MainSlider title={"Top Party"} data={partyRes?.data || []} />
    </Container>

      </div>
  );
}
