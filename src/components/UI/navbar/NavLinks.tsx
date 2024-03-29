import React, { useMemo } from "react";

import Title from "../Title";
import { useURL } from "../../../hooks/useURL";
import { useLocation } from "../../../hooks/useLocation";
import { useProductContext } from "../../../stores/useProductContext";
import { Link } from "react-router-dom";
import formatCupomToText from "../../../formaters/format-cupom-to-text";
import { useMainLayout } from "../layouts/MainLayout/contexts/MainLayoutContext";
import Skeleton from "../Skeleton";

type Props = {
  onNavLinkClick: ({ href }: { href: string }) => void;
};

type NavLink = {
  text: string;
  href: string;
  isExternal?: boolean;
  isInternal?: boolean;
  isFancy: boolean;
  isInPage: false;
  isInfo: boolean;
};
export default function NavLinks(props: Props) {
  const { onNavLinkClick } = props || {};
  const { currentLocation } = useLocation();
  const { productContext } = useProductContext((s) => s);
  const appQuery = useMainLayout()


  const navLinks = useMemo(() => {
    switch (currentLocation) {
      case "": {
        //HOME LINKS
        return [
          { text: "Home", href: "#home", isInPage: true },
          { text: "Produtos", href: "#produtos", isInPage: true },
          { text: "Coleções", href: "#colecoes", isInPage: true },
        ];
      }
      case "product": {
        //PRODUCT LINKS
        return [
          productContext?.cupom
            ? {
                text: formatCupomToText({ cupom: productContext.cupom }),
                isFancy: true,
                isInfo: true,
              }
            : undefined,
          { text: `Home`, href: "/", isInteral: true, isInPage: false },
        ];
      }
      default: {
        // DEFAULT LINKS
        return [{ text: "Home", href: "/" }];
      }
    }
  }, [currentLocation, productContext]) as NavLink[];

  if(appQuery.isLoading) {
    return (
      <div className="flex items-center gap-4">
        {Array(3).fill(1).map((_, idx) => <Skeleton key={idx} width={100} height={40} />)}
      </div>
    )
  }

  return (
    <ul className="flex items-center  gap-6">
      {navLinks?.map((link, idx) =>
        link ? (
          <NavLink key={idx} onNavLinkClick={onNavLinkClick} {...link} />
        ) : null
      )}
    </ul>
  );
}

type NavLinkProps = {
  onNavLinkClick: ({ href }: { href: string }) => void;
} & NavLink;

type LinkElementProps = Partial<
  React.ComponentProps<typeof Link> &
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
>;
function NavLink(props: NavLinkProps) {
  const { text, href, onNavLinkClick, isFancy, isInPage, isInfo, isExternal } =
    props;
  const { isActive } = useURL({
    key: href ? "hash" : "pathname",
    path: href ? href : "",
  });
  const className = `${
    isFancy ? "text-gradient-secondary" : ""
  } flex items-center gap-1`;
  const handleClick = () => {
    onNavLinkClick?.({ href });
  };
  const Span = <span>{text}</span>;
  const linkProps: LinkElementProps = {
    className: className,
    href: href,
    onClick: handleClick,
  };
  return (
    <li>
      <Title
        className="text-sm flex justify-center"
        isActive={isActive}
        hideUnderline={isInfo}
      >
        {isExternal || isInPage ? (
          <a {...linkProps}>{Span}</a>
        ) : (
          <Link {...linkProps} to={href}>
            {Span}
          </Link>
        )}
      </Title>
    </li>
  );
}
