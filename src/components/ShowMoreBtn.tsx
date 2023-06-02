import React, { useState, forwardRef, ForwardedRef } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

type Props = {
  onButtonClick?: (isShowingMore: boolean) => void;
  onIsShowingMoreChange?: (isShowingMore: boolean) => void;
  activedText?: string;
  deactivatedText?: string
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
const ShowMoreBtn = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    // eslint-disable-next-line react/prop-types
    const { className, onButtonClick, onIsShowingMoreChange, activedText, deactivatedText, ...rest } = props;
    const [isShowingMore, setIsShowingMore] = useState<boolean>(false);
    const hadleClick = () => {
      setIsShowingMore((prev) => {
        const newIsShowingMore = !prev;
        onIsShowingMoreChange?.(newIsShowingMore);
        return newIsShowingMore;
      });
      onButtonClick?.(isShowingMore);
    };
    const text = isShowingMore 
    ? deactivatedText 
      ? deactivatedText 
      : "Ver menos"
    : activedText 
      ?  activedText 
      : "Ver mais"

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
        <span>{text}</span>
        {!isShowingMore ? <MdExpandMore /> : null}
      </button>
    );
  }
);

ShowMoreBtn.displayName = "ShowMoreBtn";

export default ShowMoreBtn;
