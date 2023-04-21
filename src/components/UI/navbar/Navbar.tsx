import Skeleton from "../Skeleton";
import { Link } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { Drawer as DrawerComp } from "@mantine/core";
import useWindowRole from "../../../hooks/useWindowRole";
import { useTailwind } from "../../../hooks/useTailwind";
import { useDisclosure } from "@mantine/hooks";
import { useMainLayout } from "../layouts/MainLayout";
import Social from "./Social";
import Avatar from "../Avatar";
import { iApp } from "../../../types";

type Props = {} & React.HTMLAttributes<HTMLElement>;

export default function Navbar(props: Props) {
  const { app } = useMainLayout();
  const { theme } = useTailwind();
  const [isOpen, { open: handleOnOpen, close: handleOnClose }] = useDisclosure(false);
  const { role: windowRole } = useWindowRole();
  return (
    <nav 
     {...props}
     className={`${props.className}`}
    >
     
        <Skeleton className="fixed top-12 right-12 " style={{ width: "fit-content" }}>
          <button
           onClick={handleOnOpen}
          >
            <RiMenu4Fill
              size={40}
              className="transition-all active:scale-90 hover:scale-125 cursor-pointer"
            />
          </button>
        </Skeleton>

      <Drawer
        app={app}
        handleOnClose={handleOnClose}
        isOpen={isOpen}
        windowRole={windowRole}
      />
    </nav>
  );
}

function Drawer(props: {
  isOpen: boolean;
  handleOnClose: () => void;
  windowRole: string;
  app: iApp | null;
}) {
  const { isOpen, handleOnClose, windowRole, app } = props;
  return (
    <DrawerComp
      opened={isOpen}
      onClose={handleOnClose}
      overlayProps={{ opacity: 0.5, blur: 1 }}
      size={windowRole === "sm" ? "75%" : "35%"}
      position="right"
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <Skeleton>
          <Avatar
            src={app?.avatar}
            className=" w-52"
            alt={`${app?.name} avatar`}
          />
        </Skeleton>
        <Skeleton>
          <span className="text-3xl font-semibold">{app?.name}</span>
        </Skeleton>
        <Skeleton>Links: </Skeleton>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {app?.socials.map((social) => (
            <Social social={social} />
          ))}
        </div>
      </div>
    </DrawerComp>
  );
}
