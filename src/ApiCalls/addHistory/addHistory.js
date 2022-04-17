import axios from "axios";

export const addHistory = async (video, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/history",
      data: { video: video },
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 201) {
      setUser_Data({ type: "ADD_TO_HISTORY", payload: response.data.history });
    }
  } catch (e) {
    console.log("error occured: ", e);
  }
};
