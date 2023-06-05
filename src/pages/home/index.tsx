import React from "react";
import { YoutubeVideoPlayer } from "./components/YoutubeVideoPlayer";
import { getProducts } from "../../services/product";
import useAsyncData from "../../hooks/useAsyncData";
import Avatar from "../../components/UI/Avatar";
import { getCollections } from "../../services/collection";
import { formatProductsToCards } from "../../formaters/format-product-to-cards";
import { formatCollectionsToCards } from "../../formaters/format-collection-to-cards";
import { AnimateOnView } from "../../components/AnimateOnView";
import { HomeContext } from "./contexts/useHomeContext";
import ProductsAndCollectionsSwiper from "./components/ProductsAndCollectionsSwiper";
import Describer from "./components/Describer";
import CardList from "../../components/UI/CardList";
import { AnimateOnViewProvider } from "../../components/AnimateOnView/contexts/AnimateOnViewProvider";
import { useMainLayout } from "../../components/UI/layouts/MainLayout/contexts/MainLayoutContext";
import Skeleton from "../../components/UI/Skeleton";
import useIntersection from "../../hooks/useIntersection";
import { useNavbar } from "../../stores/useNavbar";
import shallow from "zustand/shallow";
import PageSections from "../../components/PageSections";

export default function Home() {
  const { setShouldDisplayNavbar } = useNavbar((s) => s, shallow);
  const { elementToObserve } = useIntersection({
    onUnIntersection() {
      setShouldDisplayNavbar(true);
    },
    onIntersection() {
      setShouldDisplayNavbar(false);
    },
  });
  //
  const appQuery = useMainLayout();
  const collectionsQuery = useAsyncData(getCollections);
  const productsQuery = useAsyncData(getProducts);

  //data
  const app = appQuery?.app;
  const collections = collectionsQuery?.data;
  const products = productsQuery?.data;

  //loading states
  const isCollectionsLoading = collectionsQuery?.isLoading;
  const isProductsLoading = productsQuery?.isLoading;

  return (
    <HomeContext.Provider value={{ appQuery, collectionsQuery, productsQuery }}>
      <div className="rounded-df p-4 flex flex-col gap-32">
        <PageSections hash="#home" className=" flex flex-col gap-32" >
            <AnimateOnViewProvider
              shouldAnimate={!appQuery.isLoading}
              shouldAnimateOnce={true}
              containerClassName="flex flex-col md:grid md:grid-cols-[1fr_2fr]
              justify-center  items-center gap-12 
              "
            >

             <div ref={elementToObserve}>
             <AnimateOnView
                animate={{
                  opacity: [0.4, 1],
                  transition: { duration:1 },
                }}
                className="flex justify-center "
              >
                  <Skeleton>
                    <Avatar
                      className="max-w-[270px] transition-all rotate-3 hover:rotate-0  "
                      toolipText={app?.name}
                    />
                  </Skeleton>
              </AnimateOnView>
             </div>

              <AnimateOnView
                animate={{
                  opacity: [0.4, 1],
                  transition: { duration:1},
                }}
              >
                <Describer />
              </AnimateOnView>
            </AnimateOnViewProvider>
          <ProductsAndCollectionsSwiper />
          <YoutubeVideoPlayer />  
        </PageSections>
        <PageSections hash="#produtos">
          <CardList
            list={formatProductsToCards(products)}
            isLoading={isProductsLoading}
          />
        </PageSections>
        <PageSections hash="#colecoes">
          <CardList
            list={formatCollectionsToCards(collections)}
            isLoading={isCollectionsLoading}
          />
        </PageSections>
      </div>
    </HomeContext.Provider>
  );
}
