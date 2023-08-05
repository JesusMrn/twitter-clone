import React, { useMemo, useState } from "react";

import { Account } from "../models";
import { getUserAccount, removeUserAccount, storeUserAccount } from "../utils";

interface ContextProps {
  userAccount: Account;
  setUserAccount: React.Dispatch<React.SetStateAction<Account>>;
  clearUserAccount: () => void;
  updateUserAccount: (user: Account) => void;
}

export const GlobalContext = React.createContext<ContextProps>(
  {} as ContextProps
);

interface ProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [userAccount, setUserAccount] = useState<Account>(getUserAccount());

  const clearUserAccount = () => {
    removeUserAccount();
    setUserAccount({} as Account);
  };

  const updateUserAccount = (user: Account) => {
    storeUserAccount(user);
    setUserAccount(user);
  };

  const value = useMemo(
    () => ({
      userAccount,
      setUserAccount,
      clearUserAccount,
      updateUserAccount,
    }),
    [userAccount]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
