import YouTube from 'react-youtube';
import Skeleton from '../components/UI/Skeleton';
import getLayoutWidth from '../utils/get-layout-width';
import getYoutubeVideoId from '../utils/get-youtube-video-id';
import { useData } from '../stores/useData';
import { shallow } from 'zustand/shallow';
import CardList, { iCard } from '../components/UI/CardList';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/product';
import { iProduct } from '../types';

const formatProductsToCards = (products:iProduct[]):iCard[] => {
  return products?.map((product) => ({
    id: product._id,
    image: product.banner,
    text: product.name,
    type: product._type
  }))
}

export default function Home() {
  const { app } = useData(s => ({ ...s }), shallow)
  const [products, setProducts] = useState<iProduct[]>([])
  const [isProductsLoading, setIsProductsLoading] = useState(true)
  console.log(products)
  useEffect(() => {
      setTimeout(() => {
        getProducts()
       .then((data) => {
        setProducts(data)
        setIsProductsLoading(false)
       })
      }, 2000)
  }, [])
  return (
    <div className='rounded-df p-4 flex flex-col  w-fit'>
        <div style={{ width: getLayoutWidth(), height: 450 }}>
          {app?.video && (
              <YouTube 
              videoId={getYoutubeVideoId(app?.video || "")} 
              opts={{ width: getLayoutWidth(), height: 450 }} 
              />
          )}
          {!app?.video && (
            <Skeleton 
            skeletonOptions={{ width: getLayoutWidth(), height: 450 }}
            renderwhen={false} 
            />
          )}
        </div>
        
        
        <CardList 
        
         list={formatProductsToCards(products)} 
         isLoading={isProductsLoading}  
        />
    </div>
  )
}


