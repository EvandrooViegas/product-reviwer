import React from "react";
import Swiper from "../../../components/UI/Swiper";

import { SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Title from "../../../components/UI/Title";
import formatCollectionProductToSwiper from "../../../formaters/format-collections-product-to-swiper";
import { useHomeContext } from "../contexts/useHomeContext";
import Skeleton from "../../../components/UI/Skeleton";
import useLayout from "../../../hooks/useLayout";
import Overlay from "../../../components/Overlay";
import ShowIf from "../../../components/utils/ShowIf";
import trimString from "../../../utils/trim-string";
import { AnimateOnView } from "../../../components/AnimateOnView";

export default function ProductsAndCollectionsSwiper() {
  const { appQuery } = useHomeContext();
  const app = appQuery?.app;
  const isLoading = appQuery?.isLoading;
  const swiper = app?.swiper;
  const swiperTitle = swiper?.title;
  const swiperElements = swiper?.elements;
  const formatedElements = formatCollectionProductToSwiper(swiperElements);
  return (
    <div>
      <Title>{swiperTitle}</Title>

        <AnimateOnView
          animate={{ opacity: [0.4, 1], transition: { delay: 0.2 } }}
          shouldAnimateOnce={true}
          shouldAnimate={!isLoading}
        >
          <ShowIf condition={!!formatedElements}>
            <Swiper>
              {formatedElements?.map?.((element) => (
                <SwiperSlide
                  key={element._id}
                  className="w-full h-[25rem] group "
                >
                  <Link to={`/${element._type}/${element._id}`}>
                    <div
                      className="relative w-full h-full flex justify-center items-center px-20 rounded"
                      style={{
                        backgroundImage: `url(${element.banner})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="absolute inset-0 transition bg-black/60 rounded" />
                      <div className="absolute inset-0 flex flex-col items-end p-8 gap-1">
                        <Overlay
                          isShowBackground
                          isResetPosition
                          className="font-bold italic"
                        >
                          {element.cupom?.formated_cupom}
                        </Overlay>
                        <Overlay isResetPosition isShowBackground={false}>
                          {element.date}
                        </Overlay>
                      </div>
                      <div className="relative flex flex-col gap-3 items-center">
                        <Title>{element.title}</Title>
                        <p className="text-xs text-center text-neutral-300 md:w-2/3 ">
                          {trimString(element.description, {
                            end: 60,
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </ShowIf>
        </AnimateOnView>
    </div>
  );
}
