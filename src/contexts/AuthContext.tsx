import React, { SetStateAction, useState } from "react";
import { AuthModel } from "../modals/AuthModal";

export type AuthContextType = {
    authModel: AuthModel | null;
    setAuthModel: React.Dispatch<SetStateAction<AuthModel>>;
  };

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authModel, setAuthModel] = useState<AuthModel>(new AuthModel());

  return (
    <AuthContext.Provider value={{authModel, setAuthModel}}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
