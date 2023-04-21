import { iProduct, iCollection } from "../../types";
import getLayoutWidth from "../../utils/get-layout-width";
import Card from "./Card";
import Skeleton, { SkeletonProvider } from "./Skeleton";
import Title from "./Title";

export type iCard = {
  id: string;
  text: string;
  image: string;
  type: string;
  description: string;
};
type Props = {
  list: iCard[] | null;
  title?: string;
  isLoading: boolean;
  showTitle?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function CardList(props: Props) {
  const { list, title, isLoading, showTitle = true } = props;
  const listType = list?.[0].type || null;
  const fakeData = new Array(3).fill(0);
  return (
    <div
      {...props}
      className={`
      flex flex-col gap-4
      md:grid md:grid-cols-2 mt-12  
      ${props.className}
    `}
    >
      <SkeletonProvider
        contextProps={{
          visible: isLoading,
          mt: "md",
        }}
      >
        <>
          <div className="col-span-2">
            <Skeleton>
              <Title>
                <p>
                  {listType === "product" && showTitle && !title
                    ? "Lista de Produtos"
                    : "Lista de Coleções"}
                </p>
              </Title>
            </Skeleton>
          </div>
          {!isLoading &&
            list?.map((item, idx) => (
              <Card
                isLoading={false}
                key={item.id}
                full={idx === 0}
                item={item}
              />
            ))}
          {isLoading &&
            fakeData.map((_, idx) => (
              <Card isLoading={isLoading} key={idx} full={idx === 0} />
            ))}
        </>
      </SkeletonProvider>
    </div>
  );
}
