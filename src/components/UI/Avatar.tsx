import React, { LegacyRef, useState } from "react";

import { forwardRef } from "react";
import { useMainLayout } from "./layouts/MainLayout/contexts/MainLayoutContext";
import Tooltip from "../Tooltip";
type Props = {
  toolipText?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Avatar = forwardRef(
  (props: Props, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const { app } = useMainLayout();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
    const { toolipText, className, alt, src, ...rest } = props;
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const shouldRenderTooltip = Boolean(toolipText && isHoveringImage);
    return (
      <div className={`relative ${className}`}>
        <img
          className={` rounded object-cover ${className}`}
          alt={`Avatar Image ${alt}`}
          src={src || app?.avatar || undefined}
          ref={ref as LegacyRef<HTMLImageElement>}
          onMouseOver={() => setIsHoveringImage(true)}
          onMouseOut={() => setIsHoveringImage(false)}
          {...rest}
        />
        <Tooltip shouldShow={shouldRenderTooltip} label={toolipText} />
      </div>
    );
  }
);
export default Avatar;
Avatar.displayName = "Avatar";
