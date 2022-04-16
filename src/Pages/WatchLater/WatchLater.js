import "./WatchLater.css";
import { useUserData } from "../../Context/UserDataContext";
import { useAuthContext } from "../../Context/AuthContext";
import { Videocard } from "../../Components";

export const WatchLater = () => {
  const { user_data } = useUserData();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;

  if (user_data.watch_later.length === 0) {
    return (
      <div className="no-watch-later flex-center-row">
        <h1>
          {token
            ? `You haven't added any video into watch later.. `
            : `Please Login to see Watch Later Videos`}
        </h1>
      </div>
    );
  } else {
    return (
      <div className="main-body pad-2">
        <div className="fnt-1-5 pad-1 fnt-w-600">
          You have {user_data.watch_later.length} videos to watch .
        </div>
        <div className="video-grid flex-center-row gap-2">
          {user_data.watch_later.map((ele) => (
            <Videocard key={ele._id} ele={ele} />
          ))}
        </div>
      </div>
    );
  }
};
