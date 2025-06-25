import MainSlider from "@/components/main/MainSlider";
import Container from "@mui/material/Container";
import { sendRequest } from "@/utils/fetchApi";

export default async function Home() {
  const balladRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top`,
    method: "POST",
    body: { category: "BALLAD", limit: 10 },
  });
  const popRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top`,
    method: "POST",
    body: { category: "POP", limit: 10 },
  });
  const rapRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top`,
    method: "POST",
    body: { category: "RAP", limit: 10 },
  });
  return (
    <Container>
      <MainSlider title={"Top Ballad"} data={balladRes?.data || []} />
      <MainSlider title={"Top Pop"} data={popRes?.data || []} />
      <MainSlider title={"Top Rap"} data={rapRes?.data || []} />
    </Container>
  );
}
