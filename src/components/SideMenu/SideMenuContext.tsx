import React, { useMemo, useState } from "react";

interface ContextProps {
  selected: string | number | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
}

export const SideMenuContext = React.createContext<ContextProps>(
  {} as ContextProps
);

interface ProviderProps {
  children: React.ReactNode;
}

export const SideMenuProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<string | number>();

  const value = useMemo(
    () => ({
      selected,
      setSelected,
    }),
    [selected]
  );

  return (
    <SideMenuContext.Provider value={value}>
      {children}
    </SideMenuContext.Provider>
  );
};
