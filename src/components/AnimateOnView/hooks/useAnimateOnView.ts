import { useContext } from "react"
import { AnimateOnViewContext } from "../contexts/AnimateOnViewProvider";

export const useAnimateOnView = () => {
  return useContext(AnimateOnViewContext);
};
