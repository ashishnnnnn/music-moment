import { createContext, useContext, useReducer } from "react";
import { UserDataReducer } from "../Reducer/UserDataReducer";

const UserDataContext = createContext(null);

const useUserData = () => useContext(UserDataContext);

const initial_user_data_state = {
  liked_video: [],
  watch_later: [],
  playlist: [],
  history: [],
};

const UserDataProvider = ({ children }) => {
  const [user_data, setUser_Data] = useReducer(
    UserDataReducer,
    initial_user_data_state
  );
  return (
    <UserDataContext.Provider value={{ user_data, setUser_Data }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { useUserData, UserDataProvider };
