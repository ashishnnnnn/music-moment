import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";

export const Login = () => {
  let navigate = useNavigate();
  const { auth_state, setAuthState } = useAuthContext();
  const { user, error } = auth_state;
  const { email, password } = user;
  const { handleaddtoast } = useToast();
  const loginHandle = async (guest_login) => {
    let input_email = "";
    let input_password = "";
    if (guest_login) {
      input_email = "ashish@gmail.com";
      input_password = "ashishkumar";
    } else {
      input_email = email;
      input_password = password;
    }
    console.log(input_email, input_password);
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: input_email,
        password: input_password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.encodedToken);
      setAuthState({ type: "TOKEN", payload: response.data.encodedToken });
      setAuthState({
        type: "FIRST_NAME",
        payload: response.data.foundUser.firstName,
      });
      handleaddtoast({
        message: `Welcome ${response.data.foundUser.firstName}`,
        type: "alert-success",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      handleaddtoast({
        message: "Enter valid email and password",
        type: "alert-dang",
      });
    }
  };
  return (
    <div className="main-body pad-2">
      <div className="flex-center-column login-body">
        <div className="login-form flex-column gap-1 pad-1 fnt-1-2">
          <div className="fnt-1-5 flex-center-row fnt-w-600 mar-b-1">Login</div>
          <div className="email-container">
            <div className="fnt-1-2">Email address</div>
            <input
              className="input pad-0-8 fnt-1-2"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setAuthState({ type: "EMAIL", payload: e.target.value });
              }}
            />
          </div>
          <div className="password-conatiner">
            <div className="fnt-1-2">Password</div>
            <input
              className="input pad-0-8 fnt-1-2"
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setAuthState({ type: "PASSWORD", payload: e.target.value });
              }}
            />
          </div>
          <div
            onClick={() => {
              loginHandle(true);
            }}
            className="flex-center-row cursor-pointer theme-color fnt-w-600"
          >
            Login With Admin Credentials
          </div>

          <div
            onClick={() => {
              loginHandle(false);
            }}
            className="btn btn-primary flex-center-row text-align pad-0-8 fnt-1-2 cursor-pointer"
          >
            Login
          </div>
          <div
            onClick={() => {
              navigate("/signup");
            }}
            className="flex-center-row fnt-w-500 cursor-pointer"
          >
            Create Your Account
          </div>
        </div>
      </div>
    </div>
  );
};
