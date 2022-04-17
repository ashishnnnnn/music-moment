import axios from "axios";

export const removeAllHistory = async (handleaddtoast, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/history/all`,
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 200) {
      setUser_Data({
        type: "REMOVE_ALL_HISTORY",
        payload: response.data.history,
      });
      handleaddtoast({
        message: `Deleted the History`,
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
