import React from "react";
import { Swiper as SwiperComp } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "../../swiper.css";
import { Pagination, Autoplay } from "swiper";
import useLayout from "../../hooks/useLayout";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
} & React.ComponentProps<typeof SwiperComp>;

export default function Swiper(props: Props) {
  const { children, ...rest } = props;
  const { width } = useLayout()
  return (
      <div className="flex justify-center " >
        <SwiperComp
      className="swiper rounded"
      loop={true}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      autoplay={{ delay: 2000 }}
      modules={[Pagination, Autoplay]}
      {...rest}
    >
      
        {children}
      
    </SwiperComp>
      </div>
  );
}
