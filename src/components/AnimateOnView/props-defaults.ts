import { AnimateOnViewProps } from ".";

//defaults
export const defaultsAnimateOnView: Partial<AnimateOnViewProps> = {
  // controls if the element should be animated, ex: wait until the loading state is over
  shouldAnimate: true,
  //the state of the element before being animated.
  beforeAnimate: {
    opacity: 0,
  },
  //the actual animation
  animate: {
    opacity: [0, 1],
    transition: { duration: 1.5 },
  },
  // the element that is going to be animated
  children: null,
  //if its true the element will be animated once
  shouldAnimateOnce: false,
};
