import React from "react";

import { MainLayoutContext } from "./contexts/MainLayoutContext";
import { IProps } from "../types";
import useAsyncData from "../../../../hooks/useAsyncData";
import { getApp } from "../../../../services/app";
import { iApp } from "../../../../types";
import { SkeletonProvider } from "../../Skeleton";
import Navbar from "../../navbar";
import useLayout from "../../../../hooks/useLayout";
import Footer from "../../footer";


export default function MainLayout({ children }: IProps) {
  const {
    data: app,
    isLoading: isAppLoading,
    error: appError,
  } = useAsyncData<iApp>(getApp);
  const { width: maxWidth } = useLayout()
  return (
    <MainLayoutContext.Provider
      value={{ app, isLoading: isAppLoading, error: appError }}
    >
      <SkeletonProvider contextProps={{ visible: isAppLoading, mt: "10px", width: "100%", height: "100%" }}>
          <div className=" gradient-background min-h-screen flex justify-center">
            <div
              style={{ maxWidth  }}
              className={`flex flex-col w-full items-center`}
            >
              <Navbar />
              <div className="min-h-screen max-w-2xl">
                {children}
              </div>
              <Footer />
            </div>
          </div>
      </SkeletonProvider>
    </MainLayoutContext.Provider>
  );
}
