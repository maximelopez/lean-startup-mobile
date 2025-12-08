import React, { createContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  avatar: string;
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    name: "John Doe",
    avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
