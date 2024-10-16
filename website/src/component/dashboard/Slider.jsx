import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function App() {
  return (
    <div className=" hidden md:block">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className=" h-[50vh] overflow-hidden rounded-md">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=2880,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-01-31-at-9.40.45-pm-dWxpDb2pNbCaxERZ.jpeg"
              alt=""
              className=" w-full"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[50vh] overflow-hidden rounded-md">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-02-05-at-9.13.05-am-AzGEo7LOeZi2gn9v.jpeg"
              alt=""
              className="w-full"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" h-[50vh] overflow-hidden rounded-md">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1212,h=608,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-02-15-at-9.17.30-pm-AVLPXr08jETq2nyv.jpeg"
              alt=""
              className="w-full"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
