import { FilterProvider } from "../FilterContext";
import { VideoListProvider } from "../VideosContext";
import { ToastProvider } from "../ToastContext";
import { AuthProvider } from "../AuthContext";
import { UserDataProvider } from "../UserDataContext";

export const ClusteredContext = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <FilterProvider>
          <UserDataProvider>
            <VideoListProvider>{children}</VideoListProvider>
          </UserDataProvider>
        </FilterProvider>
      </ToastProvider>
    </AuthProvider>
  );
};
