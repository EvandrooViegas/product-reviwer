import Skeleton from "./Skeleton";
import { useMainLayout } from "./layouts/MainLayout";
import Tooltip from "./Tooltip";
import { forwardRef } from "react";
import { iApp } from "../../types";
type Props = {
  toolipText?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Avatar = forwardRef(
  (props: Props, ref?: React.ForwardedRef<HTMLDivElement>) => {
    const { app } = useMainLayout();
    const { toolipText } = props;
    return (
      <div ref={ref}>
        <Skeleton>
          {!!toolipText ? (
            <Tooltip label={toolipText} position="bottom" withArrow>
              <Image elementProps={props} app={app} />
            </Tooltip>
          ) : (
            <Image elementProps={props} app={app} />
          )}
        </Skeleton>
      </div>
    );
  }
);

export default Avatar;

const Image = forwardRef((
  props: {
    elementProps: Omit<React.ComponentProps<typeof Avatar>, "ref"> | undefined,
    app: iApp | null
  }, 
  ref: React.ForwardedRef<HTMLImageElement>
) => {
  const { app, elementProps } = props
  return (
    <img
    ref={ref}
      {...props}
      className={`relative rounded ${elementProps?.className}`}
      alt={`Avatar Image ${elementProps?.alt}`}
      src={elementProps?.src || app?.avatar || undefined}
    />
  );
})
