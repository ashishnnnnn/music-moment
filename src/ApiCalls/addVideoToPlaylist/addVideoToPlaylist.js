import axios from "axios";

export const addVideoToPlaylist = async (play_list_id, video, setUser_Data) => {
  const loginToken = localStorage.getItem("token");

  try {
    const response = await axios({
      method: "POST",
      url: `/api/user/playlists/${play_list_id}`,
      data: {
        video: video,
      },
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 201) {
      setUser_Data({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: response.data.playlist,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
