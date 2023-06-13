import React, { useEffect } from "react";

import { MainLayoutContext } from "./contexts/MainLayoutContext";
import { IProps } from "../types";
import useAsyncData from "../../../../hooks/useAsyncData";
import { getApp } from "../../../../services/app";
import { iApp } from "../../../../types";
import { SkeletonProvider } from "../../Skeleton";
import Navbar from "../../navbar";
import useLayout from "../../../../hooks/useLayout";
import Footer from "../../footer";
import { useURL } from "../../../../hooks/useURL";
import { useProductContext } from "../../../../stores/useProductContext";
import { useCollectionContext } from "../../../../stores/useCollectionContext";

export default function MainLayout({ children }: IProps) {
  const {
    data: app,
    isLoading: isAppLoading,
    error: appError,
  } = useAsyncData<iApp>(getApp);
  const { width } = useLayout();
  const { productContext } = useProductContext();
  const { collectionContext } = useCollectionContext();
  const { pathname } = useURL({ key: "pathname", path: "produtos" });
  const maxWidth = 750
  useEffect(() => {
    const defaultDocumentTitle = "Webx";
    switch (pathname) {
      case "home": {
        if (!app?.name) return;
        document.title = `Seja Bem Vindow - ${app?.name}`;
        break;
      }
      case "product": {
        if (!productContext?.name) return;
        document.title = `${productContext?.name} - ${app?.name}`;
        break;
      }
      case "collection": {
        if (!collectionContext?.name) return;
        document.title = `${collectionContext?.name} - ${app?.name}`;
        break;
      }
      default: {
        document.title = defaultDocumentTitle;
      }
    }
  }, [pathname, productContext?.name, app?.name]);
  return (
    <MainLayoutContext.Provider
      value={{ app, isLoading: isAppLoading, error: appError }}
    >
      <SkeletonProvider
        contextProps={{
          visible: isAppLoading,
          mt: "10px",
          width: "100%",
          height: "100%",
        }}
      >
        <div className=" gradient-background flex min-h-screen justify-center">
          <div
            style={{ width, maxWidth }}
            className={`flex w-full flex-col items-center`}
          >
            <Navbar />
            <div className="my-24 min-h-screen w-full" style={{ width: width, maxWidth }}>
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </SkeletonProvider>
    </MainLayoutContext.Provider>
  );
}
