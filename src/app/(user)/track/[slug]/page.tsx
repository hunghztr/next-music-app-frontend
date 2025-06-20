import WaveTrack from "@/components/track/WaveTrack";
import Container from "@mui/material/Container";
import {convertSlugId, sendRequest} from "@/utils/fetchApi";
import {getServerSession} from "next-auth";

import type {Metadata} from 'next'
import authOptions from "@/utils/authOptions";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    {params}: Props,
): Promise<Metadata> {
    const param = (await params).slug
    const slug = convertSlugId(param)
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/get-id/${slug}`,
        method: "GET"
    })
    return {
        title: res.data?.title,
        description: res.data?.description,
        openGraph:{
            title:res.data?.title,
            description:res.data?.description,
            type:"website",
            images:[``]
        }
    }
}

const DetailTrackPage = async ({params}: { params: Promise<{ slug: string }> }) => {
    const param = await params
    const trackId = convertSlugId(param.slug)

    const session = await getServerSession(authOptions)
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/get-id/${trackId}`,
        method: "GET",
    })

    const resComment = await sendRequest<IBackendRes<IPage<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/get-by-track`,
        method: "POST",
        queryParams: {
            trackId: trackId,
        }
    })
    const resLikedTrack = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`,
        method: 'GET',
        queryParams: {
            current: 1,
            pageSize: 10,
        },
        headers: {
            "Authorization": `Bearer ${session?.accessToken}`,
        }
    })
    return (
        <div>
            <Container sx={{
                background: "linear-gradient(136deg, rgb(106,112,67) 0%, rgb(11,15,20) 100%)",
                height: '400px',
                width: '100%'
            }}>
                <WaveTrack resLikedTrack={resLikedTrack.data || null} track={res.data || null}
                           comments={resComment.data?.result || null}/>
            </Container>
        </div>
    )
}
export default DetailTrackPage
