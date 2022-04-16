import "./LikedPage.css";
import { useUserData } from "../../Context/UserDataContext";
import { useAuthContext } from "../../Context/AuthContext";
import { Videocard } from "../../Components";

export const LikedPage = () => {
  const { user_data } = useUserData();
  const { auth_state, setAuthState } = useAuthContext();
  const { token } = auth_state;

  if (user_data.liked_video.length === 0) {
    return (
      <div className="no-likes flex-center-row">
        <h1>
          {token
            ? `You haven't liked any video !! why??`
            : `Please Login to see Liked Videos`}
        </h1>
      </div>
    );
  } else {
    return (
      <div className="main-body pad-2">
        <div className="fnt-1-5 pad-1 fnt-w-600">
          You have {user_data.liked_video.length} liked videos
        </div>
        <div className="video-grid flex-center-row gap-2">
          {user_data.liked_video.map((ele) => (
            <Videocard key={ele._id} ele={ele} />
          ))}
        </div>
      </div>
    );
  }
};
