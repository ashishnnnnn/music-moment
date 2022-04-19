import axios from "axios";

export const removeVideoFromPlaylist = async (
  playlist_id,
  video_id,
  setUser_Data
) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/playlists/${playlist_id}/${video_id}`,
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 200) {
      setUser_Data({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        payload: response.data.playlist,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
