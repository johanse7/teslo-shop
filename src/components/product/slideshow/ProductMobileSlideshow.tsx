"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";

import Image from "next/image";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ProductSlideshowProps = {
  images: string[];
  title: string;
  className?: string;
};

export const ProductMobileSlideshow = (pops: ProductSlideshowProps) => {
  const { images, title, className } = pops;

  return (
    <div className={className}>
      <Swiper
        style={{ width: "100vw", height: "500px" }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
