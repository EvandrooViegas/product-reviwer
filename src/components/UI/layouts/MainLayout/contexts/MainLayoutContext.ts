import { IMainLayoutContext } from "../../types";
import { createContext, useContext } from "react";
const initialMainLayoutContextValue: IMainLayoutContext = {
  isLoading: true,
  error: null,
  app: null,
};
export const MainLayoutContext = createContext<IMainLayoutContext>(
  initialMainLayoutContextValue
);

export const useMainLayout = () => {
  return useContext(MainLayoutContext);
};
