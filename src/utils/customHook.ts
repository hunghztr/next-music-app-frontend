import { RefObject, useEffect, useState } from "react"
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js"

export const useRenderByClient = () =>{
  const [hasMounted,setHasMounted] = useState<boolean>(false)
  useEffect( () =>{
    setHasMounted(true)
  },[])
  return hasMounted
}
export const useWaveSurfer = (
  ref: RefObject<HTMLDivElement | null>,
  options: Omit<WaveSurferOptions, "container">
) => {
  const [wave, setWave] = useState<WaveSurfer| null>(null);
  useEffect(() => {
    if (ref.current) {
    const w = WaveSurfer.create({
      ...options,
      container: ref.current!,
    });
    setWave(w);
        return () => w.destroy();

    }
  }, [ref, options]);

  return wave;
};