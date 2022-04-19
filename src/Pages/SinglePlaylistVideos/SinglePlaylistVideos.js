import "./SinglePlaylistVideos.css";
import { useParams } from "react-router-dom";

import { Videocard } from "../../Components";
import { useUserData } from "../../Context/UserDataContext";

export const SinglePlaylistVideos = () => {
  const { playlist_id } = useParams();
  const { user_data } = useUserData();
  const videos_in_playlist = user_data.playlist.reduce((return_array, ele) => {
    if (ele._id === playlist_id) {
      return [...return_array, ...ele.videos];
    } else {
      return [...return_array];
    }
  }, []);
  if (videos_in_playlist.length === 0) {
    return (
      <h1 className="pad-3">Your Playlist is empty..Add Some videos in it</h1>
    );
  } else {
    return (
      <div className="single-playlist-video flex pad-2 gap-2">
        {videos_in_playlist.map((ele) => (
          <Videocard key={ele._id} ele={ele} />
        ))}
      </div>
    );
  }
};
