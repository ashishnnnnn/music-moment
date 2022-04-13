import { useEffect } from "react";
import "./Toast.css";
export const Toast = ({ message, type, handleclosetoast }) => {
  useEffect(() => {
    const time_to_show_toast = setTimeout(() => {
      handleclosetoast();
    }, 1500);
    return () => {
      clearTimeout(time_to_show_toast);
    };
  });
  return (
    <div className={`alert ${type}`}>
      <p className="alert-text">{message}</p>
      <div onClick={handleclosetoast} className="alert-cross">
        &times;
      </div>
    </div>
  );
};
