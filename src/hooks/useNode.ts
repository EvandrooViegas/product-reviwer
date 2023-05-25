import { useCallback, useEffect, useState } from "react";

type Props<T> = {
  onNodeLoad?: (node: T) => void;
  onRerender?: (node: T) => void;
};

export default function useNode<NodeType>(props?: Props<NodeType>) {
  const { onNodeLoad, onRerender } = props || {};
  const [node, setNode] = useState<NodeType | null>(null);
  const ref = 
    (node: NodeType) => {
      setNode(node);
      if (node) onNodeLoad?.(node as NodeType);
    }
 

  useEffect(() => {
    onRerender?.(node);
  });
  return { ref, node };
}
