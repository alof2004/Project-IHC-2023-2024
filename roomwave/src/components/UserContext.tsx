import React, { ReactNode, createContext, useContext, useState } from "react";

// Define the type for the user data
interface UserData {
  email: string;
  password: string;
  type: string;
  birthdate: string;
  phone: string;
  firstname: string;
  lastname: string;
  job: string;
  // Add other properties as needed
}

interface UserContextType {
    user: UserData | null;
    loginUser: (userData: UserData) => void;
    logoutUser: () => void;
  }
  
  const initialContextValue: UserContextType = {
    user: null,
    loginUser: () => {},
    logoutUser: () => {},
  };
  
  const UserContext = createContext<UserContextType>(initialContextValue);
  
  export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
  
    const loginUser = (userData: UserData) => {
      setUser(userData);
    };
  
    const logoutUser = () => {
      setUser(null);
    };
  
    return (
      <UserContext.Provider value={{ user, loginUser, logoutUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => useContext(UserContext);