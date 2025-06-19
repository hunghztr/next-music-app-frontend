'use client'
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Chip, IconButton } from '@mui/material';
import {useEffect, useState} from 'react';
import {sendRequest} from "@/utils/fetchApi";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

const Interaction = ({track,resLikedTrack} : {track : IShareTrack|null;
    resLikedTrack : ITrackTop[]|null}) => {
    const {data :session} = useSession();
    const route = useRouter()
    const [liked, setLiked] = useState(false);
    const exist = resLikedTrack?.some(i => i.id === track?.id)
    useEffect(() => {
        if(exist){
            setLiked(true);
        }else{
            setLiked(false);
        }
    },[track,liked])
    const handleInteract =async () =>{
        const res = await sendRequest<IBackendRes<string>>({
            url:`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`,
            method:'POST',
            queryParams:{
                trackId:track?.id,
                isLike: liked?0:1
            },
            headers:{
                "Authorization": `Bearer ${session?.accessToken}`
            }
        })
        if(res.status === 200){
            route.refresh()
        }else{
            console.log(res.message)
        }
    }
    return (
        <div className="flex items-center justify-between w-full">
            {/* Nút Like bên trái */}
            <IconButton
                color={liked ? 'error' : 'default'}
                onClick={() => handleInteract()}>
                <FavoriteIcon />
            </IconButton>

            {/* Like & View bên phải */}
            <div className="flex gap-2">
                <Chip
                    label={track?.countLike}
                    variant="outlined"
                    icon={<FavoriteIcon sx={{ color: 'red' }} />}
                />
                <Chip
                    label={track?.countPlay}
                    variant="outlined"
                    icon={<VisibilityIcon />}
                />
            </div>
        </div>
    );
};

export default Interaction;
