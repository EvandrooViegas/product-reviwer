import React, { useState, useRef } from "react";
import ShowMoreBtn from "./ShowMoreBtn";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = {
  children: React.ReactNode[] | React.ReactNode;
  visibleItemsQty?: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function ShowMoreItems(props: Props) {
  //destructuring props
  const {
    children: childrens,
    visibleItemsQty: initialVisibleQty = 4,
    // eslint-disable-next-line react/prop-types
    className,
    ...rest
  } = props;

  const childrenArr: React.ReactNode[] = Array.isArray(childrens)
    ? childrens
    : [childrens];

  const childrenArrSize = childrenArr.length;
  const shouldShowShowMoreBtn = childrenArrSize > initialVisibleQty
  const [visibleItemsQty, setVisibleItemsQty] = useState(initialVisibleQty);
  const slicedChildrenArr = childrenArr.slice(0, visibleItemsQty);

  const [isShowingMore, setIsShowingMore] = useState(false);

  const handleShowMoreBtnClick = (isShowingMore: boolean) => {
    const newVisibilityItemQty = isShowingMore
      ? initialVisibleQty
      : childrenArrSize;
    setVisibleItemsQty(newVisibilityItemQty);
  };

  if (!childrens) return null;

  return (
    <div
      className={` ${className} transition-all`}
      {...rest}
    >
      {slicedChildrenArr.map((child, index) => <React.Fragment key={index}>{child}</React.Fragment> )}
     
        {shouldShowShowMoreBtn ? <ShowMoreBtn
          className="col-span-full"
          onIsShowingMoreChange={(isShowingMore) =>
            setIsShowingMore(isShowingMore)
          }
          onButtonClick={(showMore) => handleShowMoreBtnClick(showMore)}
        /> : null}

    </div>
  );
}
