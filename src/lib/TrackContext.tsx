"use client";

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackProvier = ({ children }: { children: React.ReactNode }) => {
  const init = {
    id: "",
    title: "",
    description: "",
    category: "",
    imgUrl: "",
    trackUrl: "",
    countLike: 0,
    countPlay: 0,
    uploader: {
      id: "",
      email: "",
      name: "",
      avatar: "",
      role: "",
      type: "",
    },
    createdAt: "",
    updatedAt: "",
    isDeleted: false,
    isPlaying: false,
  };
  const [currentTrack, setCurrentTrack] = useState<IShareTrack>(init);
  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
export const useTrackContext = () => useContext(TrackContext);
