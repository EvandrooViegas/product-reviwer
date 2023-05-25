import { AnimateOnViewProps } from "..";
import { IAnimateOnViewContext } from "../contexts/AnimateOnViewProvider";
import { defaultsAnimateOnView } from "../props-defaults";

type IPropsFormater = {
  props: AnimateOnViewProps;
  animateOnViewContext: IAnimateOnViewContext;
};
export const propsFormater = ({
  props,
  animateOnViewContext,
}: IPropsFormater): AnimateOnViewProps => {

  return { ...defaultsAnimateOnView, ...animateOnViewContext, ...props }
};
