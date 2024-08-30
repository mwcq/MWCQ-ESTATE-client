import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updataUser = (user) => {
    setCurrentUser(user);
    // localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updataUser }}>
      {children}
    </AuthContext.Provider>
  );
};
