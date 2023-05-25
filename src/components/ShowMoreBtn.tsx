import React, { useState, forwardRef, ForwardedRef } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

type Props = {
  onButtonClick: (isShowingMore: boolean) => void;
  onIsShowingMoreChange: (isShowingMore: boolean) => void;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
const ShowMoreBtn = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    // eslint-disable-next-line react/prop-types
    const { className, onButtonClick, onIsShowingMoreChange, ...rest } = props;
    const [isShowingMore, setIsShowingMore] = useState<boolean>(false);
    const hadleClick = () => {
      setIsShowingMore((prev) => {
        const newIsShowingMore = !prev;
        onIsShowingMoreChange(newIsShowingMore);
        return newIsShowingMore;
      });
      onButtonClick?.(isShowingMore);
    };
    return (
      <button
        ref={ref}
        className={`
        flex flex-col items-center
        font-bold text-zinc-400 text-xs 
        transition-all hover:text-zinc-300
        cursor-pointer ${className}
        `}
        onClick={hadleClick}
        {...rest}
      >
        {isShowingMore ? <MdExpandLess /> : null}
        <span>Ver {isShowingMore ? `menos` : `mais`}</span>
        {!isShowingMore ? <MdExpandMore /> : null}
      </button>
    );
  }
);

ShowMoreBtn.displayName = "ShowMoreBtn";

export default ShowMoreBtn;
