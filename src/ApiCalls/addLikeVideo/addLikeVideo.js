import axios from "axios";

export const addLikeVideo = async (video, handleaddtoast, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/likes",
      data: { video: video },
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 201) {
      setUser_Data({ type: "ADD_TO_LIKED", payload: response.data.likes });
      handleaddtoast({
        message: `Liked the video`,
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
