import "./History.css";
import { useUserData } from "../../Context/UserDataContext";
import { useAuthContext } from "../../Context/AuthContext";
import { Videocard } from "../../Components";
import { removeAllHistory } from "../../ApiCalls";
import { useToast } from "../../Context/ToastContext";

export const History = () => {
  const { user_data, setUser_Data } = useUserData();
  const { handleaddtoast } = useToast();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
  const latest_history = [...user_data.history];
  latest_history.reverse();
  if (user_data.history.length === 0) {
    return (
      <div className="no-history flex-center-row">
        <h1>
          {token
            ? `You haven't watched any video so far ... Why ??`
            : `Please Login to see History`}
        </h1>
      </div>
    );
  } else {
    return (
      <div className="main-body pad-2 ">
        <div className="fnt-1-5 pad-1 fnt-w-600 flex mar-b-2">
          <p className="mar-r-auto">
            You have {user_data.history.length} video in your history .
          </p>
          <div
            onClick={() => {
              removeAllHistory(handleaddtoast, setUser_Data);
            }}
            className="flex gap-0-5 theme-color cursor-pointer"
          >
            <i class="fas fa-trash"></i>
            <p>Clear History</p>
          </div>
        </div>

        <div className="video-grid flex-center-row gap-2">
          {latest_history.map((ele) => (
            <Videocard key={ele._id} ele={ele} />
          ))}
        </div>
      </div>
    );
  }
};
