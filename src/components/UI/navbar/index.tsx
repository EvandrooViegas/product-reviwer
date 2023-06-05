import React from "react";
import { useNavbar } from "../../../stores/useNavbar";
import Avatar from "../Avatar";
import useLayout from "../../../hooks/useLayout";
import NavLinks from "./NavLinks";
import { motion, AnimatePresence } from "framer-motion";
import { useMainLayout } from "../layouts/MainLayout/contexts/MainLayoutContext";
import Skeleton from "../Skeleton";

type Props = React.HTMLAttributes<HTMLElement>;

export default function Navbar(props: Props) {
  const { width } = useLayout();
  const { shouldDisplayNavbar, setIsBeingSnaped } = useNavbar((s) => s);
  // eslint-disable-next-line react/prop-types
  const { className } = props;
  const handleNavLink = () => {
    setIsBeingSnaped(true);
    const intervalId = setInterval(() => {
      setIsBeingSnaped(false);
      clearInterval(intervalId);
    }, 750);
  };
  const appQuery = useMainLayout();

  return (
    <header {...props} className={`${className}`}>
      <AnimatePresence>
        {shouldDisplayNavbar ? (
          <div
            className="fixed top-4 left-0 right-0 flex justify-center center-h w-full z-nav"
            style={{ maxWidth: width }}
          >
            <motion.nav
              initial={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -30 }}
              className="flex justify-between items-center gap-12 backdrop-blur-3xl bg-zinc-700/70 rounded px-8 py-5 md:px-6 md:py-4"
              >
                {
                appQuery.isLoading 
                  ? <Skeleton className="hidden md:flex md:w-16 rounded" /> 
                  : <Avatar className="hidden md:flex md:w-16 rounded " /> 
                }

                <NavLinks onNavLinkClick={handleNavLink} />
            </motion.nav>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
