import { FilterProvider } from "../FilterContext";
import { VideoListProvider } from "../VideosContext";
import { ToastProvider } from "../ToastContext";
import { AuthProvider } from "../AuthContext";
import { UserDataProvider } from "../UserDataContext";
import { VideoNotesProvider } from "../VideoNotesContext";

export const ClusteredContext = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <FilterProvider>
          <UserDataProvider>
            <VideoListProvider>
              <VideoNotesProvider>{children}</VideoNotesProvider>
            </VideoListProvider>
          </UserDataProvider>
        </FilterProvider>
      </ToastProvider>
    </AuthProvider>
  );
};
