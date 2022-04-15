import "./Videocard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../Context/ToastContext";
import { addLikeVideo } from "../../ApiCalls/addLikeVideo";
import { removeLikeVideo } from "../../ApiCalls/removeLikeVideo";
import { useUserData } from "../../Context/UserDataContext";
import { useAuthContext } from "../../Context/AuthContext";

export const Videocard = ({ ele }) => {
  const [show_options, setShowOptions] = useState(false);
  const { user_data, setUser_Data } = useUserData();
  const { handleaddtoast } = useToast();
  let navigate = useNavigate();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
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
        <div className="video-card-options-list pad-0-5 flex-center-row">
          <ul className="flex-column gap-0-5">
            <li>
              {user_data.liked_video.find((item) => item?._id === ele._id) ? (
                <div className="flex mini-video-option gap-0-5">
                  <i
                    onClick={() => {
                      removeLikeVideo(ele._id, handleaddtoast, setUser_Data);
                      setShowOptions((pre_state) => !pre_state);
                    }}
                    className="fas fa-thumbs-up cursor-pointer"
                  ></i>
                  <p>Remove from Liked Video</p>
                </div>
              ) : (
                <div className="flex mini-video-option gap-0-5">
                  <i
                    onClick={() => {
                      if (token) {
                        addLikeVideo(ele, handleaddtoast, setUser_Data);
                        setShowOptions((pre_state) => !pre_state);
                      } else {
                        handleaddtoast({
                          message: "Please First Login To Like Video",
                          type: "alert-dang",
                        });
                      }
                    }}
                    className="far fa-thumbs-up cursor-pointer"
                  ></i>
                  <p>Add to Like Video</p>
                </div>
              )}
            </li>
            <li>
              <div className="flex mini-video-option gap-0-5">
                <i className="far fa-heart cursor-pointer"></i>
                <p className="">Add to Watch Later</p>
              </div>
            </li>
            <li>
              <div className="flex mini-video-option gap-0-5">
                <i className="fas fa-plus cursor-pointer"></i>
                <p>Add to Playlist</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
