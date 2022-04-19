import { createContext, useContext, useReducer } from "react";
import { VideoNotesReducer } from "../Reducer/VideoNotesReducer";

const VideoNotesContext = createContext(null);

const useVideoNotes = () => useContext(VideoNotesContext);

const initialVideoNotes = {};

const VideoNotesProvider = ({ children }) => {
  const [videoNotesData, setVideoNotesData] = useReducer(
    VideoNotesReducer,
    initialVideoNotes
  );
  return (
    <VideoNotesContext.Provider value={{ videoNotesData, setVideoNotesData }}>
      {children}
    </VideoNotesContext.Provider>
  );
};

export { useVideoNotes, VideoNotesProvider };
