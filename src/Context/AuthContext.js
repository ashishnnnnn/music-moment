import { createContext, useContext, useReducer } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";

const AuthContext = createContext(null);

const useAuthContext = () => useContext(AuthContext);

const localtoken = localStorage.getItem("token");

const initial_auth_state = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  error: null,
  token: localtoken ?? null,
};

const AuthProvider = ({ children }) => {
  const [auth_state, setAuthState] = useReducer(
    AuthReducer,
    initial_auth_state
  );
  return (
    <AuthContext.Provider value={{ auth_state, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
