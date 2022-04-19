import "./Videocard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../Context/ToastContext";
import { useLocation } from "react-router";

import { PlaylistModal } from "..";

import {
  addLikeVideo,
  removeLikeVideo,
  addWatchLater,
  removeWatchLater,
  removeSingleHistory,
  removeVideoFromPlaylist,
} from "../../ApiCalls";
import { useUserData } from "../../Context/UserDataContext";
import { useAuthContext } from "../../Context/AuthContext";

export const Videocard = ({ ele }) => {
  const [show_playlist_modal, setShowPlaylistModal] = useState(false);
  const [show_options, setShowOptions] = useState(false);
  const { user_data, setUser_Data } = useUserData();
  const { handleaddtoast } = useToast();
  let navigate = useNavigate();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
  const location = useLocation().pathname;
  const likeHandler = () => {
    if (token) {
      addLikeVideo(ele, handleaddtoast, setUser_Data);
      setShowOptions((pre_state) => !pre_state);
    } else {
      handleaddtoast({
        message: "Please First Login To Like Video",
        type: "alert-dang",
      });
    }
  };
  const watchLaterHandler = () => {
    if (token) {
      addWatchLater(ele, handleaddtoast, setUser_Data);
      setShowOptions((pre_state) => !pre_state);
    } else {
      handleaddtoast({
        message: "Please First Login To Add To Watch Later",
        type: "alert-dang",
      });
    }
  };
  return (
    <div className="video-card pad-0-5">
      <div className="card vertical-card">
        <div
          onClick={() => {
            navigate(`/single-video/${ele._id}`);
          }}
          className="text-img img-container"
        >
          <img src={ele.img_src} alt="song-image" />
          <div className="text-overlay flex-center-row">
            <i class="fas fa-play fnt-2 color-white"></i>
          </div>
        </div>
      </div>
      <div className="flex video-description gap-1-5 ali-ce">
        <div className="video-title pad-l-0-5 fnt-w-600 fnt-1-2">
          {ele.title}
        </div>
        <div
          onClick={() => {
            setShowOptions((pre_state) => !pre_state);
          }}
          className="video-card-option cursor-pointer flex-center-row pad-tb-0-5"
        >
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <p className="pad-l-0-5 fnt-w-500">{ele.views}M Views</p>
      <div className="pad-l-0-5 mar-t-0-5 flex ali-ce gap-0-5">
        <img
          className="channel-logo"
          src={ele.channel_src}
          alt="channel-logo"
        />
        <p>{ele.channel_name}</p>
      </div>
      {show_options && (
        <div className="video-card-options-list pad-0-5 flex-center-row fnt-1-2">
          {location === "/history" ? (
            <ul className="flex-column gap-0-5">
              <li>
                <div className="flex mini-video-option gap-0-5">
                  <i
                    onClick={() => {
                      removeSingleHistory(
                        ele._id,
                        handleaddtoast,
                        setUser_Data
                      );
                      setShowOptions((pre_state) => !pre_state);
                    }}
                    className="fas fa-trash cursor-pointer"
                  ></i>
                  <p>Remove from history</p>
                </div>
              </li>
            </ul>
          ) : (
            <>
              {location.substring(0, 5) === "/play" ? (
                <ul className="flex-column gap-0-5">
                  <li>
                    <div className="flex mini-video-option gap-0-5">
                      <i
                        onClick={async () => {
                          await removeVideoFromPlaylist(
                            location.split("/")[2],
                            ele._id,
                            setUser_Data
                          );
                          handleaddtoast({
                            message: "Video Removed from playlist",
                            type: "alert-success",
                          });
                          setShowOptions((pre_state) => !pre_state);
                        }}
                        className="fas fa-trash cursor-pointer"
                      ></i>
                      <p>Remove from Playlist</p>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="flex-column gap-0-5">
                  <li>
                    {user_data.liked_video.find(
                      (item) => item?._id === ele._id
                    ) ? (
                      <div className="flex mini-video-option gap-0-5">
                        <i
                          onClick={() => {
                            removeLikeVideo(
                              ele._id,
                              handleaddtoast,
                              setUser_Data
                            );
                            setShowOptions((pre_state) => !pre_state);
                          }}
                          className="fas fa-thumbs-up cursor-pointer"
                        ></i>
                        <p>Remove from Liked Video</p>
                      </div>
                    ) : (
                      <div className="flex mini-video-option gap-0-5">
                        <i
                          onClick={likeHandler}
                          className="far fa-thumbs-up cursor-pointer"
                        ></i>
                        <p>Add to Like Video</p>
                      </div>
                    )}
                  </li>
                  <li>
                    {user_data.watch_later.find(
                      (item) => item?._id === ele._id
                    ) ? (
                      <div className="flex mini-video-option gap-0-5">
                        <i
                          onClick={() => {
                            removeWatchLater(
                              ele._id,
                              handleaddtoast,
                              setUser_Data
                            );
                            setShowOptions((pre_state) => !pre_state);
                          }}
                          className="fas fa-heart cursor-pointer"
                        ></i>
                        <p>Remove from Watch Later</p>
                      </div>
                    ) : (
                      <div className="flex mini-video-option gap-0-5">
                        <i
                          onClick={watchLaterHandler}
                          className="far fa-heart cursor-pointer cursor-pointer"
                        ></i>
                        <p>Add to Watch Later</p>
                      </div>
                    )}
                  </li>
                  <li>
                    <div className="flex mini-video-option gap-0-5">
                      <i
                        onClick={() => {
                          if (token) {
                            setShowPlaylistModal((pre_state) => !pre_state);
                          } else {
                            handleaddtoast({
                              message:
                                "Please First Login To Do Playlist operation",
                              type: "alert-dang",
                            });
                          }
                        }}
                        className="fas fa-plus cursor-pointer"
                      ></i>
                      <p>Add to Playlist</p>
                    </div>
                    {show_playlist_modal && (
                      <PlaylistModal
                        video={ele}
                        toggle_modal={setShowPlaylistModal}
                        toggle_option={setShowOptions}
                      />
                    )}
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
