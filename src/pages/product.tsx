import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/product";
import useAsyncData from "../hooks/useAsyncData";
import { useNavbar } from "../stores/useNavbar";
import { useProductContext } from "../stores/useProductContext";
import Title from "../components/UI/Title";
import TrimmedText from "../components/TrimmedText";
import Skeleton, { SkeletonProvider } from "../components/UI/Skeleton";
import ShadowHoverImage from "../components/ShadowHoverImage";
import CollectionRowCard from "../components/CollectionRowCard";
import { Link } from "react-router-dom";
import ShowMoreItems from "../components/ShowMoreItems";
import ProductLink from "../components/ProductLink";

export default function Product() {
  const params = useParams();
  const productId = params.id;
  const { setProductContext } = useProductContext((s) => s);
  const { data: product, isLoading: isProductLoading } = useAsyncData(
    () => getProduct(productId || ""),
    {
      dependecies: [productId],
      delay: 2000,
      onFetch(data) {
        if (data) setProductContext(data);
      },
    }
  );
  const { setShouldDisplayNavbar } = useNavbar();
  useEffect(() => {
    setShouldDisplayNavbar(true);
  }, []);

  const sectionClassName = "flex w-full flex-col gap-1 items-start";
  const hasCollections = Boolean(product?.collections?.length);
  const hasLinks = Boolean(product?.links?.length);
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
        <div className="mt-40 flex flex-col gap-12">
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
    <div className="mt-40 flex w-full flex-col gap-14">
      <section className={sectionClassName}>
        <ShadowHoverImage
          src={product?.image}
          className="h-[400px] w-full rounded object-cover"
        />
        <Title className="items-start text-left text-2xl">
          {product?.name}
        </Title>
        <TrimmedText
          className="flex flex-col gap-5 text-sm text-neutral-500"
          text={product?.description}
        />
      </section>
      {hasCollections && (
        <section className={sectionClassName}>
          <>
            <Title className="items-start text-left text-xs">
              Incluido em:{" "}
            </Title>
            <ShowMoreItems className="flex flex-col gap-5">
              {product?.collections.map((collection) => (
                <CollectionRowCard
                  isLoading={isProductLoading}
                  collection={collection}
                  key={collection._id}
                />
              ))}
            </ShowMoreItems>
          </>
        </section>
      )}
      {hasLinks && (
        <section className={sectionClassName}>
          <>
            <Title className="items-start text-left text-xs">Links: </Title>
            <ShowMoreItems className="flex flex-col gap-5">
              {product?.links.map((link) => (
                <ProductLink
                  isLoading={isProductLoading}
                  link={link}
                  key={link._key}
                />
              ))}
            </ShowMoreItems>
          </>
        </section>
      )}
    </div>
  );
}
