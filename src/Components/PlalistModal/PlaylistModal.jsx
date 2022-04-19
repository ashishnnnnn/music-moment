import "./PlaylistModal.css";
import { useUserData } from "../../Context/UserDataContext";
import { useToast } from "../../Context/ToastContext";
import {
  addWatchLater,
  removeWatchLater,
  addPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../../ApiCalls";
import { useState } from "react";
import LoadingAnimation from "react-circle-loading-animation";

export const PlaylistModal = ({ video, toggle_modal, toggle_option }) => {
  const { user_data, setUser_Data } = useUserData();
  const { handleaddtoast } = useToast();
  const [isloading, setisloading] = useState(false);
  const [show_input, setShowInput] = useState(false);
  const [input_playlist_name, setInputPlaylist] = useState("");
  return (
    <div className="pop_up">
      {isloading && <LoadingAnimation isLoading={true} color={"red"} />}
      <div className="pop_up_background"></div>
      <div className="pop_up_details fnt-2 pad-1-5">
        <div
          onClick={() => {
            toggle_modal((pre_state) => !pre_state);
            if (toggle_option) {
              toggle_option((pre_state) => !pre_state);
            }
          }}
          className="cross fnt-3"
        >
          &times;
        </div>
        <div className="playlist">
          <p className="fnt-1-5 theme-color mar-b-0-5">Playlists</p>
          <ul className="flex-column gap-0-5">
            <li className="flex gap-1 fnt-1-2 ali-ce">
              {user_data.watch_later.find((item) => item?._id === video._id) ? (
                <input
                  onClick={async () => {
                    setisloading(true);
                    await removeWatchLater(
                      video._id,
                      handleaddtoast,
                      setUser_Data
                    );
                    setisloading(false);
                  }}
                  type="checkbox"
                  className="cursor-pointer checkbox"
                  checked={true}
                />
              ) : (
                <input
                  onClick={async () => {
                    setisloading(true);
                    await addWatchLater(video, handleaddtoast, setUser_Data);
                    setisloading(false);
                  }}
                  type="checkbox"
                  className="cursor-pointer checkbox"
                  checked={false}
                />
              )}

              <p>Watch Later</p>
            </li>
            {user_data.playlist.map((ele) => (
              <li className="flex gap-1 fnt-1-2 ali-ce" key={ele._id}>
                {ele.videos.find((item) => item?._id === video._id) ? (
                  <input
                    onClick={async () => {
                      setisloading(true);
                      await removeVideoFromPlaylist(
                        ele._id,
                        video._id,
                        setUser_Data
                      );
                      setisloading(false);
                    }}
                    type="checkbox"
                    className="cursor-pointer checkbox"
                    checked={true}
                  />
                ) : (
                  <input
                    onClick={async () => {
                      setisloading(true);
                      await addVideoToPlaylist(ele._id, video, setUser_Data);
                      setisloading(false);
                    }}
                    type="checkbox"
                    className="cursor-pointer checkbox"
                    checked={false}
                  />
                )}
                <p>{ele.title}</p>
              </li>
            ))}
          </ul>
          {!show_input && (
            <button
              onClick={() => {
                setShowInput((pre_state) => !pre_state);
              }}
              className="create-playlist pad-0-5 flex-center-row fnt-1-2 theme-color cursor-pointer"
            >
              Create Playlist
            </button>
          )}
          {show_input && (
            <div className="flex-column mar-t-1 gap-0-5">
              <p className="fnt-1-2 ">Name</p>
              <input
                placeholder="playlist-name"
                className="playListInput fnt-1-2 pad-0-5"
                onChange={(e) => {
                  setInputPlaylist(e.target.value);
                }}
              />
              <span
                onClick={() => {
                  if (input_playlist_name.length === 0) {
                    alert("Playlist name should exist");
                  } else {
                    addPlaylist(input_playlist_name, setUser_Data);
                  }
                  setShowInput((pre_state) => !pre_state);
                }}
                className="mar-l-auto theme-color cursor-pointer fnt-1-2 fnt-w-600"
              >
                Create
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
