import {
  Home,
  Explore,
  Login,
  Signup,
  SingleVideoPage,
  LikedPage,
  WatchLater,
} from "../Pages";
import { Routes, Route } from "react-router-dom";

export const WebSiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/single-video/:video_id" element={<SingleVideoPage />} />
      <Route path="/liked" element={<LikedPage />} />
      <Route path="/watch-later" element={<WatchLater />} />
    </Routes>
  );
};
