
import { iCard } from "./CardList"
import Skeleton from "./Skeleton"

type Props = {
    full: boolean,
    item?: iCard,
    isLoading: boolean
} & React.HTMLAttributes<HTMLDivElement>
export default function Card(props:Props) {
    const { full, item, isLoading } = props
    return (
        <div {...props} className={`flex flex-col gap-5 ${props.className} ${full ? 'col-span-2' : ''}`}>
            <Skeleton renderwhen={!isLoading} className="w-full h-72">
                <img 
                    className="w-full object-cover h-72 rounded-df"
                    src={item?.image}
                />
            </Skeleton>
            <Skeleton renderwhen={!isLoading} className="w-60 h-5">
                <p className="font-semibold">{item?.text}</p>
            </Skeleton>
        </div>
    )
}
