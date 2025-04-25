import { createContext, useContext, useState, ReactNode } from "react";
import { IUsers } from "@/types/User";
type UserContextType = {
  user: IUsers | null;
  login: (userData: IUsers) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUsers | null>(null);

  const login = (userData: IUsers) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.setItem("accessToken","");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
