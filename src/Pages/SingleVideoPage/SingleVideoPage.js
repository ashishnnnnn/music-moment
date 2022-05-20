import "./SingleVideoPage.css";
import { useParams } from "react-router-dom";
import { getCurrentVideo } from "../../Utils/getCurrentVideo";
import { getOtherVideos } from "../../Utils/getOtherVideos";
import { Videocard } from "../../Components";
import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useUserData } from "../../Context/UserDataContext";
import { useToast } from "../../Context/ToastContext";
import { useAuthContext } from "../../Context/AuthContext";
import {
  addHistory,
  removeThenAddHistory,
  addLikeVideo,
  removeLikeVideo,
  addWatchLater,
  removeWatchLater,
} from "../../ApiCalls";
import { PlaylistModal } from "../../Components";
import { useVideoNotes } from "../../Context/VideoNotesContext";

export const SingleVideoPage = () => {
  const { video_id } = useParams();
  const video_list = JSON.parse(localStorage.getItem("videos"));
  const curr_video = getCurrentVideo(video_list, video_id);
  const videoPlayerRef = useRef();
  const { user_data, setUser_Data } = useUserData();
  const { handleaddtoast } = useToast();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
  const [show_modal, setShowModal] = useState(false);
  const { videoNotesData, setVideoNotesData } = useVideoNotes();
  const [notesText, setNotesText] = useState("");
  const likeHandler = (video) => {
    if (token) {
      addLikeVideo(video, handleaddtoast, setUser_Data);
    } else {
      handleaddtoast({
        message: "Please First Login To Like Video",
        type: "alert-dang",
      });
    }
  };
  const watchLaterHandler = (video) => {
    if (token) {
      addWatchLater(video, handleaddtoast, setUser_Data);
    } else {
      handleaddtoast({
        message: "Please First Login To Add To Watch Later",
        type: "alert-dang",
      });
    }
  };
  useEffect(() => {
    if (user_data.history.find((item) => item?._id === video_id)) {
      removeThenAddHistory(curr_video, setUser_Data);
    } else {
      addHistory(curr_video, setUser_Data);
    }
  }, [video_id]);
  const addNotesHandler = () => {
    setNotesText("");
    const time_in_sec = Math.floor(videoPlayerRef.current.getCurrentTime());
    if (notesText.length > 4) {
      if (videoNotesData[video_id]) {
        setVideoNotesData({
          type: "ADD_NOTES_TO_PRESENT_VIDEO_NOTES",
          payload: {
            _id: video_id,
            notes: {
              time: `${Math.floor(time_in_sec / 60)} Min ${
                time_in_sec % 60
              } Sec`,
              text: notesText,
            },
          },
        });
      } else {
        setVideoNotesData({
          type: "ADD_NEW_VIDEO_NOTES",
          payload: {
            _id: video_id,
            notes: {
              time: `${Math.floor(time_in_sec / 60)} Min ${
                time_in_sec % 60
              } Sec`,
              text: notesText,
            },
          },
        });
      }
      handleaddtoast({
        message: "Notes Added",
        type: "alert-success",
      });
    } else {
      handleaddtoast({
        message: "Notes length should be greater than 3",
        type: "alert-dang",
      });
    }
  };
  return (
    <div className="main-body single-video-body pad-2">
      <div className="video-container">
        <ReactPlayer
          className="video-player"
          ref={videoPlayerRef}
          url={`https://www.youtube.com/embed/${video_id}`}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          controls
          width="100%"
          height="25rem"
          title={curr_video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></ReactPlayer>
        <div className="single-video-title fnt-1-5 fnt-w-500 mar-t-0-5">
          {curr_video?.title}
        </div>
        <div className="flex single-video-option mar-t-1 fnt-1-2 ali-ce">
          {user_data.liked_video.find(
            (item) => item?._id === curr_video._id
          ) ? (
            <div
              onClick={() => {
                removeLikeVideo(curr_video._id, handleaddtoast, setUser_Data);
              }}
              className="flex gap-0-1 ali-ce cursor-pointer"
            >
              <i class="fas fa-thumbs-up "></i>
              <p className="mar-r-1">Unlike</p>
            </div>
          ) : (
            <div
              onClick={() => {
                likeHandler(curr_video);
              }}
              className="flex gap-0-1 ali-ce cursor-pointer"
            >
              <i class="far fa-thumbs-up "></i>
              <p className="mar-r-1">Like</p>
            </div>
          )}
          {user_data.watch_later.find(
            (item) => item?._id === curr_video._id
          ) ? (
            <div
              onClick={() => {
                removeWatchLater(curr_video._id, handleaddtoast, setUser_Data);
              }}
              className="flex gap-0-1 ali-ce cursor-pointer"
            >
              <i class="fas fa-heart "></i>
              <p className="mar-r-1">Remove Watch Later</p>
            </div>
          ) : (
            <div
              onClick={() => {
                watchLaterHandler(curr_video);
              }}
              className="flex gap-0-1 ali-ce cursor-pointer"
            >
              <i class="far fa-heart "></i>
              <p className="mar-r-1">Add to Watch Later</p>
            </div>
          )}
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className="flex-center-row cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
              <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z"></path>
            </svg>
            <p className="mar-right-auto">Add to Playlist</p>
          </div>

          <div className="mar-l-auto">
            <p>{curr_video?.views}M views</p>
          </div>
        </div>
        <div className="mar-t-1 video-notes">
          <p className="fnt-1-5 fnt-w-600 theme-color">Notes on this video</p>
          <div className="pad-1 notes-container flex-column gap-1">
            {videoNotesData[video_id] &&
              videoNotesData[video_id].map((ele) => (
                <div
                  className="notes pad-0-5 flex ali-ce jst-sp-sb"
                  key={ele._id}
                >
                  <div className="notes-text fnt-1-2 mar-r-auto">
                    {ele.text}
                  </div>
                  <div className="notes-theme theme-color">{ele.time}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="mar-t-1 add-notes">
          <p className="fnt-1-5 fnt-w-600 theme-color">Take Notes</p>
          <textarea
            value={notesText}
            onChange={(e) => {
              setNotesText(e.target.value);
            }}
            className="pad-0-5 fnt-1-2"
          />
          <i
            onClick={() => {
              if (token) {
                addNotesHandler();
              } else {
                handleaddtoast({
                  message: "Please First Login To Add Notes",
                  type: "alert-dang",
                });
              }
            }}
            class="fas fa-plus-circle add-notes-btn theme-color fnt-2 cursor-pointer"
          ></i>
        </div>
      </div>
      <div className="side-video-list flex-column gap-1">
        <div className="fnt-2 fnt-w-500">Related Videos</div>
        {getOtherVideos(curr_video?.singer, video_id, video_list).map((ele) => (
          <Videocard key={ele._id} ele={ele} />
        ))}
      </div>
      {show_modal && (
        <PlaylistModal video={curr_video} toggle_modal={setShowModal} />
      )}
    </div>
  );
};
