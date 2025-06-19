'use client'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {useTrackContext} from "@/lib/TrackContext";
import PauseIcon from "@mui/icons-material/Pause";
import Link from 'next/link';
const Profile = ({res} :{res :IBackendRes<IPage>}) =>{
    const {currentTrack,setCurrentTrack} = useTrackContext() as ITrackContext;

    return (
        <Box sx={{ display: "flex", gap: 8, flexWrap: "wrap" ,justifyContent:'center' }}>
            {res.data?.result.map((item) => (
                <Card key={item.id} sx={{ display: "flex",justifyContent:'space-between',
                    width: 600,marginTop:'20px' }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                            <Link href={`/track/${item.id}?audio=${item.trackUrl}&id=${item.id}`}>
                            <Typography component="div" variant="h5">
                                {item.title}
                            </Typography>
                            </Link>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: "text.secondary" }}
                            >
                                {item.uploader.name}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                            <IconButton aria-label="previous">
                                <SkipPreviousIcon />
                            </IconButton>
                            {(currentTrack.id !== item.id ||(currentTrack.id === item.id && !currentTrack.isPlaying))
                                &&
                                (<IconButton aria-label="play/pause"
                                        onClick={() => {
                                            setCurrentTrack({...item,isPlaying:true})}}>
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>)
                            }
                            {(currentTrack.isPlaying && currentTrack.id === item.id)
                                &&
                                <IconButton aria-label="play/pause"
                                onClick={() => {
                                setCurrentTrack({...item,isPlaying:false})}}>
                                <PauseIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                            }
                            <IconButton aria-label="next">
                                <SkipNextIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                        alt="Live from space album cover"
                    />
                </Card>
            ))}
        </Box>
    )
}
export default Profile;