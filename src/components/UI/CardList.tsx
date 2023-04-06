import { iProduct, iCollection } from '../../types'
import getLayoutWidth from '../../utils/get-layout-width'
import Card from './Card'
import Skeleton from './Skeleton'
import Title from './Title'


export type iCard = {
  id: string,
  text: string,
  image: string,
  type: string
}
type Props = {
    list: iCard[],
    title?: string,
    isLoading: boolean,
    showTitle?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function CardList(props:Props) {
  const { 
    list, 
    title,
    isLoading, 
    showTitle = true
  } = props
  const listType:"product" | "collection" | string = list[0]?.type
  const fakeData = new Array(1).fill(0)
  return (
    <div {...props} className={`grid grid-cols-2 mt-12 gap-4 ${props.className}`}>
          <Title className='text-3xl mb-12 font-semibold col-span-2 text-center'>
            {listType === "product" && showTitle 
              ? "Lista de Produtos"
              : "Collection List"
            }
          </Title>
          {!isLoading && list?.map((item, idx) => (
              <Card 
                isLoading={false}
                key={item.id}
                full={idx === 0}
                item={item}
              />
          ))}
          {isLoading && fakeData.map((item, idx) => (
              <Card 
                isLoading={isLoading}
                key={idx}
                full={idx === 0}
              />
          ))}
    </div>
  )
}
