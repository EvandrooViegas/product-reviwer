import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/product";
import useAsyncData from "../hooks/useAsyncData";
import { useNavbar } from "../stores/useNavbar";
import { useProductContext } from "../stores/useProductContext";
import Title from "../components/UI/Title";
import TrimmedText from "../components/TrimmedText";
import Skeleton, { SkeletonProvider } from "../components/UI/Skeleton";
import CollectionRowCard from "../components/CollectionRowCard";
import { Link } from "react-router-dom";
import ShowMoreItems from "../components/ShowMoreItems";
import ProductLink from "../components/ProductLink";
import ItemTypeIndicator from "../components/ItemTypeIndicator";
import BorderHoverImage from "../components/BorderHoverImage";
import { YoutubeVideoPlayer } from "./home/components/YoutubeVideoPlayer";


const SectionTitle = ({ title }:{ title: string }) => <Title className="items-start text-left text-xs">{title}</Title>

export default function Product() {
  const params = useParams();
  const productId = params.id;
  const { setProductContext } = useProductContext((s) => s);
  const { data: product, isLoading: isProductLoading } = useAsyncData(
    () => getProduct(productId || ""),
    {
      dependecies: [productId],
      onFetch(data) {
        if (data) setProductContext(data);
      },
    }
  );
  const { setShouldDisplayNavbar } = useNavbar();
  useEffect(() => {
    setShouldDisplayNavbar(true);
  }, []);

  console.log(product)

  const sectionClassName = "flex w-full flex-col gap-1 items-start";
  const hasCollections = Boolean(product?.collections?.length);
  const hasLinks = Boolean(product?.links?.length);
  const hasReviewVideo = Boolean(product?.video)
  if (!isProductLoading && !product) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-2xl font-bold">
        <h3>O produto não está disponível</h3>
        <Link
          to="/"
          className="rounded bg-white/30 px-4 py-2 text-sm transition-all hover:bg-white/40"
        >
          Voltar para a home
        </Link>
      </div>
    );
  }

  if (isProductLoading) {
    return (
      <SkeletonProvider contextProps={{ visible: isProductLoading }}>
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
          src={product?.image}
          className="h-[400px] w-full rounded object-cover"
        />
        <SectionTitle title="Info: " />
        <ItemTypeIndicator type={product?._type} />
        <Title className="items-start text-left text-2xl" fancy={true}>
          {product?.name}
        </Title>
        <TrimmedText
          className="flex flex-col gap-5 text-xs text-neutral-500"
          text={product?.description}
        />
      </section>
      {hasCollections ? (
        <section className={sectionClassName}>
          <SectionTitle title="Incluido em: " />

          <ShowMoreItems className="flex flex-col gap-5">
            {product?.collections?.map((collection) => (
              <CollectionRowCard collection={collection} key={collection._id} />
            ))}
          </ShowMoreItems>
        </section>
      ) : null}
      {hasLinks ? (
        <section className={sectionClassName}>
          <SectionTitle title="Links: " />

          <ShowMoreItems className="flex flex-col gap-2">
            {product?.links.map((link) => (
              <ProductLink link={link} key={link._key} />
            ))}
          </ShowMoreItems>
        </section>
      ) : null}
      {hasReviewVideo ? (
        <section className="flex flex-col gap-1">
          <SectionTitle title="Video: " />
          <YoutubeVideoPlayer url={product?.video} shouldAnimate={false} isLoading={isProductLoading} showCaptions={false} />
        </section>
      ) : null}
    </div>
  );
}
