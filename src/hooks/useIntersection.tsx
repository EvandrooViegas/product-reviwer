import { useCallback, useEffect, useRef, useState } from "react";


type Props = {
  intersectionOptions?:  IntersectionObserverInit;
  onIntersection?: () => void;
  onUnIntersection?: () => void;
};

export default function useIntersection(props?: Props) {
  const { onIntersection, onUnIntersection, intersectionOptions } = props || {};
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isElementBeingObserved = useRef(false);
  const elementToObserve = useCallback((node: Element | null) => {
    setNode(node);
  }, []);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if(!isIntersecting) {
            setIsIntersecting(true);
          }
          onIntersection?.();
        } else {
          if(intersectionOptions) {
            setIsIntersecting(false);
          }
          onUnIntersection?.();
        }
      });
    }, intersectionOptions);

    observerRef.current = observer;
    if (!isElementBeingObserved.current) {
      observer.observe(node);
      isElementBeingObserved.current = true;
    }

    return () => {
      observer.disconnect();
      setIsIntersecting(false);
      onUnIntersection?.();
      isElementBeingObserved.current = false;
    };
  }, [node, intersectionOptions]);

  return { isIntersecting, elementToObserve, node };
}
