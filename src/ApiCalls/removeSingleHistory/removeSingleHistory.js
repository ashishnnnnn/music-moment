import axios from "axios";

export const removeSingleHistory = async (id, handleaddtoast, setUser_Data) => {
  const loginToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/history/${id}`,
      headers: {
        authorization: loginToken,
      },
    });
    if (response.status === 200) {
      setUser_Data({
        type: "REMOVE_FROM_HISTORY",
        payload: response.data.history,
      });
      handleaddtoast({
        message: `Removed from History`,
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
