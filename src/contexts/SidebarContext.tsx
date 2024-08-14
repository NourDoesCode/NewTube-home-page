import { createContext, ReactNode, useContext, useState } from "react";

type SidebarProviderProps = {
  children: ReactNode;
};
type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};
const SidebarContext = createContext<SidebarContextType | null>(null);

{
  /* function that allows us to use this context */
}
export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value === null) {
    throw Error("Cannot use outside of the sidebar provider");
  }
  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((s) => !s);
    } else {
      setIsLargeOpen((l) => !l);
    }
  }
  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  function isScreenSmall() {
    return window.innerWidth < 1024;
  }
  return (
    <SidebarContext.Provider
      value={{
        isSmallOpen,
        isLargeOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
