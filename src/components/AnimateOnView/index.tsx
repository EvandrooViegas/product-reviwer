import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  motion,
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
  useInView
} from "framer-motion";

import { useAnimateOnView } from "./hooks/useAnimateOnView";
import { propsFormater as propsFormaterFunc } from "./utils/propsFormater";

//types

type Animate =
  | boolean
  | AnimationControls
  | TargetAndTransition
  | VariantLabels
  | undefined;

export type AnimateOnViewProps = {
  children?: React.ReactNode;
  animate?: Animate;
  beforeAnimate?: Animate;
  shouldAnimate?: boolean;
  shouldAnimateOnce?: boolean;
} & React.ComponentProps<typeof motion.div>;



export const AnimateOnView = (props: AnimateOnViewProps) => {
  const animateOnViewContext = useAnimateOnView();
  // animation getter

  //props formater
  const propsFormater = useCallback(
    () => propsFormaterFunc({ props, animateOnViewContext }),
    [props, animateOnViewContext]
  );
  //props
  const {
    children,
    animate,
    beforeAnimate,
    shouldAnimate,
    shouldAnimateOnce,
    ...rest
  } = propsFormater();

  if (!children) return null;

  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementToObserve = useRef<HTMLDivElement | null>(null)
  const isIntersecting = useInView(elementToObserve, { once: shouldAnimateOnce && hasAnimated  });
  const animation = (
      shouldAnimate 
      ? isIntersecting
        ? animate
        : undefined
      : undefined
    );

  useEffect(() => {
    if(isIntersecting) setHasAnimated(true);
  }, [isIntersecting])
  return (

      <motion.div
        ref={elementToObserve} 
        animate={animation}
        className="w-full h-full"
        {...rest}
      >
        {children}
      </motion.div>
  
  );
};
