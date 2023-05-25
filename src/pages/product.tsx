import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/product";
import { iLink } from "../types";
import Skeleton, { SkeletonProvider } from "../components/UI/Skeleton";
import { Accordion, Divider } from "@mantine/core";
import useAsyncData from "../hooks/useAsyncData";
import { AccordionItem } from "../components/UI/Accordion";
import CollectionRowCard from "../components/CollectionRowCard";
import trimString from "../utils/trim-string";
import { useNavbar } from "../stores/useNavbar";
import { useProductContext } from "../stores/useProductContext";

export default function Product() {
  const params = useParams();
  const productId = params.id!;
  const { setProductContext } = useProductContext((s) => s);
  const { data: product, isLoading: isProductLoading } = useAsyncData(
    () => getProduct(productId),
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

  return (
    <div className="py-20">
      <SkeletonProvider
        contextProps={{
          mt: "10px",
          radius: "35px",
          visible: isProductLoading,
        }}
      >
        <Skeleton>
          <img
            className="w-full h-[50vh] object-cover rounded-df"
            src={product?.banner}
          />
        </Skeleton>

        <Skeleton>
          <p className="text-3xl font-semibold mt-4">{product?.name}</p>
        </Skeleton>

        <Skeleton>
          <Accordion defaultValue="links" variant="separated" radius="lg">
            <AccordionItem value="description" title="Descrição">
              <p>{product?.description}</p>
            </AccordionItem>
            <AccordionItem value="links" title="Links">
              {product?.links?.map?.((link) => (
                <div key={link._key} className="p-5">
                  <ProductLink link={link} />
                  <Divider my="sm" />
                </div>
              ))}
            </AccordionItem>
          </Accordion>
        </Skeleton>

        <div>
          <Skeleton className="">
            <span className="text-sm text-neutral-400">Incluido em: </span>
          </Skeleton>
          {product?.collections?.map((collection) => (
            <CollectionRowCard
              key={collection._id}
              image={collection.image}
              title={collection.name}
              description={trimString(collection.description)}
            />
          ))}
        </div>
        <Skeleton>
          <span className="text-xs text-neutral-500 font-semibold">
            Criado em: {product?.formated_date}
          </span>
        </Skeleton>
       <div className="transparent">
         {/* <Instagram url="https://www.instagram.com/p/CsjL8osIAgx/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" /> */}
       </div>
      </SkeletonProvider>
    </div>
  );
}

function ProductLink(props: { link: iLink }) {
  const { link } = props;
  return (
    <div className="flex items-center gap-2">
      <img src={link.icon} className="w-4 h-4" />
      <a
        href={link.url}
        rel="noreferrer"
        target="_blank"
        className="text-neutral-300 cursor-pointer hover:underline text-sm"
      >
        {link.name}
      </a>
    </div>
  );
}
