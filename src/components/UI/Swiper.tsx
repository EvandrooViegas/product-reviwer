import React from "react";
import { Swiper as SwiperComp } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "../../swiper.css";
import { Pagination, Autoplay } from "swiper";
type Props = {
  children: React.ReactNode[] | React.ReactNode;
} & React.ComponentProps<typeof SwiperComp>;

export default function Swiper(props: Props) {
  const { children, ...rest } = props;
  return (
      <div className="flex justify-center " >
      <SwiperComp
      className="swiper rounded"
      loop={true}
      spaceBetween={40}      
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      modules={[Pagination, Autoplay]}
      {...rest}
    >
      
        {children}
      
    </SwiperComp>
      </div>
  );
}
