import { createContext, useContext, useState } from "react";

const VideoListContext = createContext(null);

const useVideoList = () => useContext(VideoListContext);

const VideoListProvider = ({ children }) => {
  const [video_list, setVideoList] = useState([]);
  return (
    <VideoListContext.Provider value={{ video_list, setVideoList }}>
      {children}
    </VideoListContext.Provider>
  );
};

export { useVideoList, VideoListProvider };
