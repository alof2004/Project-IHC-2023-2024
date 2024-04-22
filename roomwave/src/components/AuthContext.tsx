import React, { createContext, useState, useContext, FC } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  loginType: string;
  login: (type: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginType, setLoginType] = useState("");

  const login = (type: string) => {
    console.log('Logging in'); // This will log when the login function is called
    setIsLoggedIn(true);
    setLoginType(type);
    setTimeout(() => {}, 3000); // This will pause execution for 1 second
    console.log('Logged in', isLoggedIn); // This might still log `false` because state updates are asynchronous
  };
  

  const logout = () => {
    setIsLoggedIn(false);
    setLoginType("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
