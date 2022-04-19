import axios from "axios";

export const addPlaylist = async (name, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/playlists",
      data: {
        playlist: { title: name, description: "not avilable" },
      },
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 201) {
      setUser_Data({
        type: "ADD_TO_PLAYLIST",
        payload: response.data.playlists,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
