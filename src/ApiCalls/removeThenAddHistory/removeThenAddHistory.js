import axios from "axios";

export const removeThenAddHistory = async (video, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    await axios({
      method: "DELETE",
      url: `/api/user/history/${video._id}`,
      headers: {
        authorization: loginToken,
      },
    });
    const final_response = await axios({
      method: "POST",
      url: "/api/user/history",
      data: { video: video },
      headers: {
        authorization: loginToken,
      },
    });
    if (final_response.status === 201) {
      setUser_Data({
        type: "ADD_TO_HISTORY",
        payload: final_response.data.history,
      });
    }
  } catch (e) {
    console.log("error occured: ", e);
  }
};
