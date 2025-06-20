"use client";
import {useRenderByClient} from "@/utils/customHook";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useTrackContext} from "@/lib/TrackContext";
import {useEffect, useRef} from "react";

const Footer = () => {
    const {currentTrack, setCurrentTrack} = useTrackContext() as ITrackContext;
    const ref = useRef<H5AudioPlayer | null>(null);
    useEffect(() => {

        const audio = ref.current?.audio?.current;
        if (currentTrack.isPlaying && audio) {
            audio!.play()
        }
        if (!currentTrack.isPlaying && audio) {
            audio!.pause()

        }

    }, [currentTrack])

    const hasMounted = useRenderByClient();
    if (!hasMounted) return <></>;

    return (
        <>{currentTrack.id && (
            <div className='mt-14'>
                <AppBar
                    position="fixed"
                    sx={{
                        top: "auto",
                        bottom: 0,
                        background: "#f2f2f2",
                    }}
                >
                    <Container sx={{display: "flex", gap: "10px"}}>
                        <H5AudioPlayer
                            onPause={() => setCurrentTrack({...currentTrack, isPlaying: false})}
                            onPlay={() => setCurrentTrack({...currentTrack, isPlaying: true})}
                            ref={ref}
                            layout='horizontal-reverse'
                            style={{boxShadow: "unset"}}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                            volume={0.5}

                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                minWidth: "100px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                className="text-black font-bold text-[1.2vw] truncate w-full">{currentTrack.title}</div>
                            <div className="text-black truncate w-full">{currentTrack.uploader.name}</div>
                        </Box>
                    </Container>
                </AppBar>
            </div>
        )}</>

    );
};
export default Footer;
