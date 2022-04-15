import axios from "axios";

export const removeLikeVideo = async (id, handleaddtoast, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/likes/${id}`,
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 200) {
      setUser_Data({ type: "REMOVE_FROM_LIKED", payload: response.data.likes });
      handleaddtoast({
        message: `Removed from Liked Video`,
        type: "alert-success",
      });
    }
  } catch (e) {
    console.log("error occured: ", e);
    handleaddtoast({
      message: "Some error occured",
      type: "alert-dang",
    });
  }
};
