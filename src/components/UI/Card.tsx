import { iCard } from "./CardList";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
type Props = {
  full: boolean;
  item?: iCard;
  isLoading: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Card(props: Props) {
  const { full, item, isLoading } = props;
  return (
    <Link
      className={`
        group
        ${props.className} 
        ${full ? "col-span-2" : ""}
     `}
     to={`/${item?.type}/${item?.id}`}
    >
      <div {...props} className="border border-transparent group-hover:border-primary  p-4 border-dashed">
        <Skeleton visible={isLoading}>
          <img
            className="
        
            w-full duration-200
             group-hover:drop-shadow-2xl drop-shadow-white
             object-cover h-72 
            "
            src={item?.image}
          />
        </Skeleton>
        <Skeleton visible={isLoading}>
          <p className="text-neutral-100 font-semibold">{item?.text}</p>
        </Skeleton>
        <Skeleton visible={isLoading}>
          <p className="text-neutral-400 text-xs truncate">{item?.description}</p>
        </Skeleton>
      </div>
    </Link>
  );
}
