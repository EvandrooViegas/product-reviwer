import React from "react";
import ShowMoreBtn from "./ShowMoreBtn";
import { useState } from "react";
import trimString from "../utils/trim-string";
type Props = {
  min?: number;
  max?: number;
  text?: string;
  isActive?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function TrimmedText(props: Props) {
  const { min = 0, max = 200, text, isActive = false, ...rest } = props;
  if (!text) return null;
  const [shouldShowMore, setShouldShowMore] = useState<boolean>(isActive);
  const label = shouldShowMore
    ? text
    : trimString(text, { start: min, end: max });
  return (
    <div {...rest}>
      <p>{label}</p>
      {label.length > max ? (
        <ShowMoreBtn
          deactivatedText="Ler Menos"
          activedText="Ler Mais"
          onIsShowingMoreChange={(isShowingMore) =>
            setShouldShowMore(isShowingMore)
          }
        />
      ) : null}
    </div>
  );
}
