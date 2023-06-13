import React, { useRef, useEffect } from "react";
import { useURL } from "../hooks/useURL";
import { useInView } from "framer-motion";
import { isArray } from "sanity";

type Props = {
  hash: string;
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function PageSections(props: Props) {
  const { hash, children, ...rest } = props;
  const { setLocation } = useURL({ key: "hash", path: hash });
  const divId = hash.split("#")[1];

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });
  useEffect(() => {
    if (isInView) {
      setLocation(hash);
    }
  }, [isInView]);
  return (
    <div {...rest} ref={ref} id={divId}>
      {isArray(children) ? children.map(child => <>{child}</>) : children} 
    </div>
  );
}

