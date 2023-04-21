import YouTube from "react-youtube";
import Skeleton from "../components/UI/Skeleton";
import getYoutubeVideoId from "../utils/get-youtube-video-id";
import CardList, { iCard } from "../components/UI/CardList";
import { getProducts } from "../services/product";
import { iApp, iCollection, iProduct } from "../types";
import { useViewportSize } from "@mantine/hooks";
import useAsyncData from "../hooks/useAsyncData";
import Typer from "../components/Typer";
import { useMainLayout } from "../components/UI/layouts/MainLayout";
import Avatar from "../components/UI/Avatar";
import SocialMediaLinks from "../components/social-media-links";
import { getCollections } from "../services/collection";
import { layoutConfig } from "../../config";

const formatProductsToCards = (products: iProduct[] | null): iCard[] | null => {
  return (
    products?.map((product) => ({
      id: product._id,
      image: product.banner,
      text: product.name,
      type: product._type,
      description: product.description || "",
    })) || null
  );
};

const formatCollectionsToCards = (
  collections: iCollection[] | null
): iCard[] | null => {
  return (
    collections?.map((collection) => ({
      id: collection._id,
      image: collection.banner,
      text: collection.name,
      type: collection._type,
      description: collection.description || "",
    })) || null
  );
};

export default function Home() {
  const viewport = useViewportSize();
  const { app } = useMainLayout();
  const { data: collections, isLoading: isCollectionsLoading } =
    useAsyncData(getCollections);
  const { data: products, isLoading: isProductsLoading } =
    useAsyncData(getProducts);

  return (
    <div className="rounded-df p-4 flex flex-col gap-32">
      <div className="grid grid-cols-[1fr_2fr] items-center gap-1">
        <Avatar
          className="w-64 h-64 transition-all hover:rotate-3"
          toolipText={app?.name}
        />
        <div className="flex flex-col text-4xl font-bold h-full">
          <Skeleton beforeLoadOptions={{ height: 40 }}>
            <p>{app?.describer?.title}</p>
          </Skeleton>
          <Skeleton beforeLoadOptions={{ height: 70 }}>
            <Typer
              className="text-6xl text-gradient-primary w-[70%] font-extrabold font-archivo leading-[fit-content]"
              words={app?.describer?.sentences}
            />
          </Skeleton>
          <SocialMediaLinks
            className="mt-auto font-normal"
            iconClass="transition w-6 h-6 rounded-md cursor-pointer object-contain  hover:scale-110"
            gap="10px"
          />
        </div>
      </div>

      <VideoPlayer app={app} viewport={viewport} />

      <CardList
        list={formatProductsToCards(products)}
        isLoading={isProductsLoading}
      />
      <CardList
        list={formatCollectionsToCards(collections)}
        isLoading={isCollectionsLoading}
      />
    </div>
  );
}

function VideoPlayer(props: {
  app: null | iApp;
  viewport: { width: number; height: number };
}) {
  const { app, viewport } = props;
  const videoWidth = layoutConfig.maxWidth;
  const videoHeight = viewport.height * 0.55;
  return (
    <div>
      {app?.video ? (
        <div className="flex justify-center">
          <YouTube
            videoId={getYoutubeVideoId(app.video)}
            opts={{
              width: videoWidth,
              height: videoHeight,
            }}
          />
        </div>
      ) : (
        <Skeleton
          style={{ width: videoWidth, height: videoHeight }}
          visible={true}
        />
      )}
    </div>
  );
}
