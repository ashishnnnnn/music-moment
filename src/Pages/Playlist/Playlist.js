import "./Playlist.css";
import { useUserData } from "../../Context/UserDataContext";
import { useAuthContext } from "../../Context/AuthContext";
import { removePlaylist } from "../../ApiCalls";
import LoadingAnimation from "react-circle-loading-animation";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Playlist = () => {
  const { user_data, setUser_Data } = useUserData();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
  const [isloading, setisloading] = useState(false);
  let navigate = useNavigate();
  if (user_data.playlist.length === 0) {
    return (
      <div className="no-playlist flex-center-row">
        <h1>
          {token
            ? `You haven't added any Playlist`
            : `Please Login to see Liked Videos`}
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        {isloading && <LoadingAnimation isLoading={true} color={"red"} />}
        <div className="mar-l-auto mar-r-auto pad-1  fnt-3">
          You have {user_data.playlist.length} playlist
        </div>
        <div className="playlist flex-center-row pad-1">
          {user_data.playlist.map((ele) => (
            <div
              key={ele._id}
              className="single-playlist flex pad-1 cursor-pointer"
              onClick={() => {
                navigate(`/playlist/${ele._id}`);
              }}
            >
              <div className="playlist-description flex-column gap-0-5 ">
                <div className="fnt-1-5">{ele.title}</div>
                <div className="fnt-1-2">{ele.videos.length} video</div>
              </div>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  (async () => {
                    setisloading(true);
                    await removePlaylist(ele._id, setUser_Data);
                    setisloading(false);
                  })();
                }}
                class="fas fa-trash fnt-2 cursor-pointer mar-l-auto"
              ></i>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
