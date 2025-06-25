import WaveTrack from "@/components/track/WaveTrack";
import Container from "@mui/material/Container";
import { convertSlugId, convertSlugUrl, sendRequest } from "@/utils/fetchApi";

import type { Metadata } from "next";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = (await params).slug;
  const slug = convertSlugId(param);
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/get-id/${slug}`,
    method: "GET",
  });
  return {
    title: res.data?.title,
    description: res.data?.description,
    openGraph: {
      title: res.data?.title,
      description: res.data?.description,
      type: "website",
      images: [``],
    },
  };
}
export async function generateStaticParams() {
  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks`,
    method: "GET",
    queryParams: {
      current: 1,
      pageSize: 10,
    },
  });
  return (res.data || []).map((track) => ({
    slug: `${convertSlugUrl(track.title)}-${track.id}.html`,
  }));
}
const DetailTrackPage = async ({ params }: Props) => {
  const param = await params;
  const trackId = convertSlugId(param.slug);

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/get-id/${trackId}`,
    method: "GET",
  });
  if (!res.data?.id) {
    notFound();
  }
  // await new Promise(resolve => setTimeout(resolve, 3000))
  const resComment = await sendRequest<IBackendRes<IPage<ITrackComment>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/get-by-track`,
    method: "POST",
    queryParams: {
      trackId: trackId,
    },
  });
  return (
    <div>
      <Container
        sx={{
          background:
            "linear-gradient(136deg, rgb(106,112,67) 0%, rgb(11,15,20) 100%)",
          height: "400px",
          width: "100%",
        }}
      >
        <WaveTrack
          track={res.data || null}
          comments={resComment.data?.result || null}
        />
      </Container>
    </div>
  );
};
export default DetailTrackPage;
