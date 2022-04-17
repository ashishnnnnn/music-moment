import axios from "axios";

export const addWatchLater = async (video, handleaddtoast, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/watchlater",
      data: { video: video },
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 201) {
      setUser_Data({
        type: "ADD_TO_WATCH_LATER",
        payload: response.data.watchlater,
      });
      handleaddtoast({
        message: `Added To Watch Later`,
        type: "alert-success",
      });
    }
  } catch (e) {
    handleaddtoast({
      message: "Some error occured",
      type: "alert-dang",
    });
  }
};
