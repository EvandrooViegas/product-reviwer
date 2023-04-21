import Navbar from "../navbar/Navbar";
import { SkeletonProvider } from "../Skeleton";
import { layoutConfig } from "../../../../config";
import useAsyncData from "../../../hooks/useAsyncData";
import { iApp } from "../../../types";
import { getApp } from "../../../services/app";
import { createContext, useContext } from "react";
import { TooltipProvider } from "../Tooltip";

interface IProps {
  children: React.ReactNode;
}

interface IMainLayoutContext {
  isLoading: boolean;
  error: Error | null;
  app: iApp | null;
}

const initialMainLayoutContextValue: IMainLayoutContext = {
  isLoading: true,
  error: null,
  app: null,
};
const MainLayoutContext = createContext<IMainLayoutContext>(
  initialMainLayoutContextValue
);

export const useMainLayout = () => {
  return useContext(MainLayoutContext);
};
export default function MainLayout({ children }: IProps) {
  const {
    data: app,
    isLoading: isAppLoading,
    error: appError,
  } = useAsyncData<iApp>(getApp, { delay: 2000 });
  return (
    <MainLayoutContext.Provider
      value={{ app, isLoading: isAppLoading, error: appError }}
    >
      <SkeletonProvider contextProps={{ visible: isAppLoading, mt: "10px" }}>
        <TooltipProvider contextProps={{  }}>
          <div className=" gradient-background min-h-screen flex justify-center">
            <div
              style={{ maxWidth: layoutConfig.maxWidth + 30 }}
              className={`flex flex-col w-full`}
            >
              <Navbar />
              {children}
            </div>
          </div>
        </TooltipProvider>
      </SkeletonProvider>
    </MainLayoutContext.Provider>
  );
}
