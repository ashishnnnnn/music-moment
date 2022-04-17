import axios from "axios";

export const removeWatchLater = async (id, handleaddtoast, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/watchlater/${id}`,
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 200) {
      setUser_Data({
        type: "REMOVE_FROM_WATCH_LATER",
        payload: response.data.watchlater,
      });
      handleaddtoast({
        message: `Removed from Watch Later`,
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
