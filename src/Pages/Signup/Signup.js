import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { validateInput } from "../../Utils/validateInput";

export const Signup = () => {
  let navigate = useNavigate();
  const { auth_state, setAuthState } = useAuthContext();
  const { user } = auth_state;
  const { firstName, lastName, email, password, confirmPassword } = user;
  const { handleaddtoast } = useToast();
  const signupHandle = async () => {
    try {
      let validate_result = validateInput(
        email,
        password,
        confirmPassword,
        firstName,
        lastName
      );

      if (validate_result === "OK") {
        const response = await axios.post(`/api/auth/signup`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        localStorage.setItem("token", response.data.encodedToken);
        setAuthState({ type: "TOKEN", payload: response.data.encodedToken });
        handleaddtoast({
          message: `Welcome ${firstName}`,
          type: "alert-success",
        });
        navigate("/");
      } else {
        handleaddtoast({
          message: validate_result,
          type: "alert-dang",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="main-body pad-2">
      <div className="flex-center-column login-body">
        <div className="login-form flex-column gap-0-5 pad-1 fnt-1-2">
          <div className="fnt-1-5 flex-center-row fnt-w-600 mar-b-1">
            SignUp
          </div>
          <div className="email-container">
            <div className="fnt-1-2">First Name</div>
            <input
              className="input pad-0-8 fnt-1-2"
              type="text"
              placeholder="Enter your First Name"
              onChange={(e) => {
                setAuthState({ type: "FIRST_NAME", payload: e.target.value });
              }}
            />
          </div>
          <div className="email-container">
            <div className="fnt-1-2">Last Name</div>
            <input
              className="input pad-0-8 fnt-1-2"
              type="text"
              placeholder="Enter your Last Name"
              onChange={(e) => {
                setAuthState({ type: "LAST_NAME", payload: e.target.value });
              }}
            />
          </div>
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
          <div className="password-conatiner">
            <div className="fnt-1-2">Confirm Password</div>
            <input
              className="input pad-0-8 fnt-1-2"
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setAuthState({
                  type: "CONFIRM_PASSWORD",
                  payload: e.target.value,
                });
              }}
            />
          </div>

          <div
            onClick={signupHandle}
            className="btn btn-primary flex-center-row text-align pad-0-8 fnt-1-2  cursor-pointer"
          >
            SignUp
          </div>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="flex-center-row fnt-w-500 cursor-pointer"
          >
            Already Have An Account
          </div>
        </div>
      </div>
    </div>
  );
};
