import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollectionContext } from "../stores/useCollectionContext";
import useAsyncData from "../hooks/useAsyncData";
import { getCollection } from "../services/collection";
import { useNavbar } from "../stores/useNavbar";
import Skeleton, { SkeletonProvider } from "../components/UI/Skeleton";
import { SectionTitle } from "./product";
import ItemTypeIndicator from "../components/ItemTypeIndicator";
import BorderHoverImage from "../components/BorderHoverImage";
import TrimmedText from "../components/TrimmedText";
import Title from "../components/UI/Title";
import ShowMoreItems from "../components/ShowMoreItems";
import { YoutubeVideoPlayer } from "./home/components/YoutubeVideoPlayer";
import { Link as RRDLink } from "react-router-dom";
import Link from "../components/Link";
import RowCard from "../components/RowCard";

export default function Collection() {
  const params = useParams();
  const collectionId = params.id;
  const { setCollectionContext } = useCollectionContext((s) => s);
  const { setShouldDisplayNavbar } = useNavbar();
  const { data: collection, isLoading: isCollectionLoading } = useAsyncData(
    () => getCollection(collectionId || ""),
    {
      dependecies: [collectionId],
      onFetch(data) {
        if (data) setCollectionContext(data);
      },
    }
  );
  useEffect(() => {
    setShouldDisplayNavbar(true);
  }, []);

  const sectionClassName = "flex w-full flex-col gap-1 items-start";
  const hasProducts = Boolean(collection?.products?.length);
  const hasLinks = Boolean(collection?.links?.length);
  const hasReviewVideo = Boolean(collection?.video);

  if (!isCollectionLoading && !collection) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-2xl font-bold">
        <h3>A coleção não está disponível</h3>
        <RRDLink
          to="/"
          className="rounded bg-white/30 px-4 py-2 text-sm transition-all hover:bg-white/40"
        >
          Voltar para a home
        </RRDLink>
      </div>
    );
  }

  if (isCollectionLoading) {
    return (
      <SkeletonProvider contextProps={{ visible: isCollectionLoading }}>
        <div className="flex flex-col gap-12">
          <section>
            {/* Info Section */}
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[30px] w-2/4" />
            <Skeleton className="h-[50px] w-full" />
          </section>

          <section>
            {/* Collections Section */}
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div className="flex gap-4" key={i}>
                  <Skeleton className="h-28 w-28" />
                  <Skeleton className="h-28 w-full" />
                </div>
              ))}
          </section>
        </div>
      </SkeletonProvider>
    );
  }
  return (
    <div className="flex w-full flex-col gap-14">
      <section className={sectionClassName}>
        <BorderHoverImage
          src={collection?.image}
          className="h-[400px] w-full rounded object-cover"
        />
        <SectionTitle title="Info: " />
        <ItemTypeIndicator type={collection?._type} />
        <Title className="items-start text-left text-2xl" fancy={true}>
          {collection?.name}
        </Title>
        <TrimmedText
          className="flex flex-col gap-5 text-xs text-neutral-500"
          text={collection?.description}
        />
      </section>
      {hasProducts ? (
        <section className={sectionClassName}>
          <SectionTitle title="Constituído por: " />

          <ShowMoreItems
            className="flex flex-col gap-5 w-full "
            visibleItemsQty={3}
          >
            {collection?.products?.map((product) =>
              product ? (
                <RowCard
                  element={{ ...product, link: `/product/${product._id}` }}
                  key={product._id}
                />
              ) : null
            )}
          </ShowMoreItems>
        </section>
      ) : null}
      {hasLinks ? (
        <section className={sectionClassName}>
          <SectionTitle title="Links: " />

          <ShowMoreItems className="flex flex-col gap-2">
            {collection?.links.map((link) => (
              <Link link={link} key={link._key} />
            ))}
          </ShowMoreItems>
        </section>
      ) : null}
      {hasReviewVideo ? (
        <section className="flex flex-col gap-1">
          <SectionTitle title="Video: " />
          <YoutubeVideoPlayer
            url={collection?.video}
            shouldAnimate={false}
            isLoading={isCollectionLoading}
            showCaptions={false}
          />
        </section>
      ) : null}
    </div>
  );
}
