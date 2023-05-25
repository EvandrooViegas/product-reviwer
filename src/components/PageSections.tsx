import React, { useRef, useEffect } from "react";
import { useURL } from "../hooks/useURL";
import { useInView } from "framer-motion";
import { useNavbar } from "../stores/useNavbar";
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
  const { setLocation } = useURL({ hash: hash });
  const divId = hash.split("#")[1];
  const { isBeingSnaped } = useNavbar((s) => s);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });
  useEffect(() => {
    if (isInView && !isBeingSnaped) {
      setLocation(hash);
    }
  }, [isInView]);
  console.log(children)
  return (
    <div {...rest} ref={ref} id={divId}>
      {isArray(children) ? children.map(child => <>{child}</>) : children} 
    </div>
  );
}

