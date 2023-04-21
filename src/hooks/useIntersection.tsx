import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  intersectionOptions?: IntersectionObserverInit;
  onIntersection?: () => void;
  onUnIntersection?: () => void;
};

export default function useIntersection(props?: Props) {
  const { onIntersection, onUnIntersection, intersectionOptions } = props || {};
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<Element | null>(null);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        onIntersection?.();
      } else {
        onUnIntersection?.();
        isIntersecting && setIsIntersecting(false);
      }
    });
  }, intersectionOptions);

  const elementToObserve = useCallback(
    (node: Element | null) => {
      setNode(node);
    },
    []
  );

  useEffect(() => {
    if (node) {
      observer.observe(node);
    }
    return () => {
      observer.disconnect();
      onUnIntersection?.();
      setIsIntersecting(false);
    };
  }, [node]);

  return { isIntersecting, elementToObserve };
}
