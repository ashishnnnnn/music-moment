import axios from "axios";

export const removePlaylist = async (playlist_id, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/playlists/${playlist_id}/}`,
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 200) {
      setUser_Data({
        type: "REMOVE_PLAYLIST",
        payload: response.data.playlist,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
