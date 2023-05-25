import React from "react";
import Card from "./Card";
import { SkeletonProvider } from "./Skeleton";
import Title from "./Title";
import { iCupom } from "../../types/iCupom";
import ShowMoreItems from "../ShowMoreItems";
export type iCard = {
  id: string;
  text: string;
  image: string;
  type: string;
  description: string;
  date: string;
  cupom?: iCupom;
};
type Props = {
  list: iCard[] | null;
  title?: string;
  isLoading: boolean;
  showTitle?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function CardList(props: Props) {
  const { list, title, isLoading, showTitle = true, ...rest } = props;
  const listType = list?.[0].type || null;
  const fakeData = new Array(4).fill(0);
  const cardListTitle =
    listType === "product" && showTitle && !title
      ? "Lista de Produtos"
      : "Lista de Coleções";
  return (
    <div
      className={`
    flex flex-col items-center gap-4
       
    `}
      {...rest}
    >
      <SkeletonProvider contextProps={{ visible: isLoading, width: "100%" }}>
        <Title>{cardListTitle}</Title>
          <ShowMoreItems className="flex flex-col md:grid md:grid-cols-2 gap-6 w-full h-fit">
            {!isLoading
              ? list?.map((item, idx) => (
                  <Card isLoading={false} key={item.id} item={item} />
                ))
              : fakeData.map((_, idx) => (
                  <Card isLoading={isLoading} key={idx} />
                ))}
          </ShowMoreItems>
      </SkeletonProvider>
    </div>
  );
}
