"use client";
import { useWaveSurfer } from "@/utils/customHook";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { WaveSurferOptions } from "wavesurfer.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Tooltip from "@mui/material/Tooltip";
import { useTrackContext } from "@/lib/TrackContext";
import CommentTrack from "@/components/track/CommentTrack";
import Interaction from "@/components/track/Interaction";
import { sendRequest } from "@/utils/fetchApi";
import Image from "next/image";

const WaveTrack = ({
  track,
  comments,
}: {
  track: IShareTrack | null;
  comments: ITrackComment[] | null;
}) => {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const route = useRouter();
  const [first, setFirst] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const refTime = useRef<HTMLDivElement>(null);
  const refHover = useRef<HTMLDivElement>(null);
  const refDuration = useRef<HTMLDivElement>(null);
  const search = useSearchParams();
  const audio = search.get("audio");
  const [play, setPlay] = useState<boolean>(false);
  const [options, setOptions] = useState<Omit<WaveSurferOptions, "container">>({
    waveColor: "#656666", // Giá trị mặc định
    progressColor: "#EE772F", // Giá trị mặc định
    url: `/api?audio=${audio}`,
    barWidth: 2,
  });
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Define gradient
      // Tạo gradient cho sóng
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
      gradient.addColorStop(0, "#656666"); // Màu trên cùng
      gradient.addColorStop(0.7, "#656666"); // Màu trên cùng (đến 70% chiều cao)
      gradient.addColorStop(0.71, "#ffffff"); // Kẻ trắng
      gradient.addColorStop(0.72, "#ffffff"); // Kẻ trắng
      gradient.addColorStop(0.73, "#B1B1B1"); // Màu dưới cùng
      gradient.addColorStop(1, "#3a3535"); // Màu dưới cùng
      // Tạo gradient cho tiến trình
      const progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 0.7
      );
      progressGradient.addColorStop(0, "#D68A3D"); // Màu nâu nhạt
      progressGradient.addColorStop(0.7, "#EB4926"); // Màu trên cùng (đến 70% chiều cao)
      progressGradient.addColorStop(0.71, "#ffffff"); // Kẻ trắng
      progressGradient.addColorStop(0.72, "#ffffff"); // Kẻ trắng
      progressGradient.addColorStop(0.73, "#F6B094"); // Màu dưới cùng
      progressGradient.addColorStop(1, "#3a3535");
      // Cập nhật options
      setOptions({
        ...options,
        waveColor: gradient,
        progressColor: progressGradient,
      });
    }
  }, [audio]);

  const wave = useWaveSurfer(ref, options);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  if (wave) {
    const waveForm = ref.current!;
    waveForm.addEventListener(
      "pointerleave",
      () => (refHover.current!.style.width = "0px")
    );
    waveForm.addEventListener(
      "pointermove",
      (e) => (refHover.current!.style.width = `${e.offsetX}px`)
    );
    wave.on(
      "decode",
      (duration) => (refDuration.current!.textContent = formatTime(duration))
    );
    wave.on(
      "timeupdate",
      (currentTime) => (refTime.current!.textContent = formatTime(currentTime))
    );
    wave.once("interaction", () => {
      wave.play();
      setPlay(true);
      setCurrentTrack({ ...currentTrack, isPlaying: false });
    });
  }
  useEffect(() => {
    if (currentTrack.isPlaying) {
      wave?.pause();
      setPlay(false);
    }
  }, [currentTrack]);
  const onPlayClick = useCallback(() => {
    if (wave?.isPlaying()) {
      wave?.pause();
      if (track) setCurrentTrack({ ...currentTrack, isPlaying: false });
    } else {
      wave?.play();
      if (track) setCurrentTrack({ ...currentTrack, isPlaying: false });

      if (first) {
        const fetch = async () => {
          const res = await sendRequest<IBackendRes<string>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/increase-view`,
            method: "POST",
            queryParams: {
              trackId: track?.id,
            },
          });
          if (res.status === 200) {
            route.refresh();
          }
          return res;
        };
        fetch();
        setFirst(false);
      }
    }
    setPlay(wave?.isPlaying() || false);
  }, [wave, first]);
  const getPercent = (moment: number) => {
    const duration = wave?.getDuration();
    if (!duration) return 0 + "%";
    const percent = Math.round((moment / duration!) * 100);
    return percent + "%";
  };
  return (
    <Suspense fallback={"loading"}>
      <>
        <div className="w-full h-full relative">
          <div className="flex absolute top-3 w-fit">
            <Button
              onClick={onPlayClick}
              sx={{
                // play pause
                backgroundColor: "#EB4926",
                color: "white",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                minWidth: "60px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {play ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <div className="ml-5">
              <h1 className="font-bold text-[2vw]">{track?.title}</h1>
              <h3 className="text-[1.2vw]">{track?.uploader?.name}</h3>
            </div>
          </div>

          <div ref={ref} className="absolute bottom-0 w-[75%] h-fit">
            <div className="flex absolute w-full h-full">
              <div
                className="absolute left-0 bottom-1/5  bg-black/50 z-10"
                ref={refTime}
              >
                0:00
              </div>
              <div
                className="absolute right-0 bottom-1/5 bg-black/50 z-10"
                ref={refDuration}
              >
                0:00
              </div>
            </div>
            <div
              className="absolute top-0 left-0 h-full bg-white/50"
              ref={refHover}
            ></div>
            <div className="w-full absolute bottom-1/2 z-20 translate-y-1/2 flex">
              {comments &&
                comments.map((i) => {
                  const percent = getPercent(i.moment);
                  if (percent === "0%") return null;
                  return (
                    <Tooltip key={i.id} title={i.content} arrow>
                      <Image
                        alt="Poster"
                        width={20}
                        height={20}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/test.png`}
                        className="object-contain"
                        style={{ position: "absolute", left: percent }}
                        onPointerMove={() => {
                          const hover = refHover.current!;
                          hover.style.width = percent;
                        }}
                      />
                    </Tooltip>
                  );
                })}
            </div>
          </div>
          <div className="w-[250px] h-[250px] bg-gray-400 absolute right-0 top-1/2 -translate-y-1/2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
              alt="Poster"
              fill
              sizes={"250px"}
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-4">
          <Interaction track={track} />
        </div>

        <div>
          <CommentTrack
            track={track || null}
            comments={comments || null}
            wave={wave}
            setPlay={setPlay}
          />
        </div>
      </>
    </Suspense>
  );
};
export default WaveTrack;
