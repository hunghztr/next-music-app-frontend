import MainSlider from "@/components/main/MainSlider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/fetchApi";
export default async function Home() {
  // const res = await fetch("http://localhost:8080/api/v1/tracks/top", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     category: "CHILL",
  //     limit: 10,
  //   }),
  // });
  // const data = await res.json();

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
    <Container>
      <MainSlider title={"Top Chill"} data={chillRes?.data || []} />
      <MainSlider title={"Top Workout"} data={workoutRes?.data || []} />
      <MainSlider title={"Top Party"} data={partyRes?.data || []} />
    </Container>
  );
}
