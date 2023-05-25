import React from "react";
import { iCard } from "./CardList";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import { AnimateOnView } from "../AnimateOnView";
import Title from "./Title";
import Overlay from "../Overlay";
import ShowIf from "../utils/ShowIf";
type Props = {
  item?: iCard;
  isLoading: boolean;
} & React.ComponentProps<typeof AnimateOnView>;

export default function Card(props: Props) {
  const { item, isLoading, ...rest } = props;
  return (
    <AnimateOnView
      shouldAnimate={!isLoading}
      className="transition rounded"
      animate={{ opacity: [0.2, 1] }}
      {...rest}
    >
      <div className="relative">
        <Link className={`group`} to={`/${item?.type}/${item?.id}`}>
          <Skeleton visible={isLoading}>
            <div className="absolute z-10 inset-0 p-5 flex flex-col items-end gap-1">
              <ShowIf condition={!!item?.cupom}>
                <Overlay isResetPosition={true}>
                  <span className="font-bold italic">
                    {item?.cupom?.formated_cupom}
                  </span>
                </Overlay>
              </ShowIf>
              <ShowIf condition={!!item?.date}>
                <Overlay isShowBackground={false} isResetPosition={true}>
                  <span>{item?.date}</span>
                </Overlay>
              </ShowIf>
            </div>
            <div>
              <img
                className="rounded-xl w-full duration-200 object-cover h-72 group-hover:shadow-2xl group-hover:shadow-primary/20"
                src={item?.image}
              />
              <div className="rounded-xl transition absolute inset-0 bg-black/20 group-hover:bg-black/10" />
            </div>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Title className="text-zinc-200 font-semibold text-sm my-1.5">
              {item?.text}
            </Title>
          </Skeleton>
            <p className="text-zinc-500 text-xs text-center">{item?.description}</p>
        </Link>
      </div>
    </AnimateOnView>
  );
}
