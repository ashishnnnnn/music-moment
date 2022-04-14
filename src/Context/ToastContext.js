import { createContext, useContext, useState } from "react";

import { Toast } from "../Components";

import { v4 as uuid } from "uuid";

const ToastContext = createContext({
  toasts: [],
  handleaddtoast: () => {},
  handleclosetoast: () => {},
});

const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const handleaddtoast = (new_toast) => {
    setToasts((prev_toasts) => [...prev_toasts, { id: uuid(), ...new_toast }]);
  };

  const handleclosetoast = (id_to_remove) => {
    setToasts((prev_toasts) =>
      prev_toasts.filter((pre_toast) => pre_toast.id !== id_to_remove)
    );
  };
  return (
    <ToastContext.Provider value={{ toasts, handleaddtoast, handleclosetoast }}>
      {children}

      <ul
        className={`alert-container ${toasts.length > 0 ? "" : "display-none"}`}
      >
        {toasts.map(({ id, message, type }) => (
          <li key={id}>
            <Toast
              message={message}
              type={type}
              handleclosetoast={() => {
                handleclosetoast(id);
              }}
            />
          </li>
        ))}
      </ul>
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
