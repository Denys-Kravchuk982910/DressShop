// Import Swiper React components
import { Swiper as SwiperContainer } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import Swiper from 'swiper';

export interface ScrollerType {
  children: React.ReactNode;
  slide: number;
  perPage: number;
  setSlide: (slideIndex: number) => void
}

export const HorizontalScroller: React.FC<ScrollerType> = ({ children, slide, perPage, setSlide }) => {
    const [swip, setSwip] = useState<Swiper>();

    useEffect(() => {
      if (swip) {
        swip.slideTo(slide);
      }
    }, [slide]);

    const handleSwiperChange = (swiper: Swiper) => {
      setSlide(swiper.activeIndex);
    }

    return (<SwiperContainer
        slidesPerView={perPage}
        slidesPerGroup={1}
        spaceBetween={30}
        className="mySwiper"
        onSwiper={(swiper: Swiper) => {
          setSwip(swiper);
        }}
        onSlideChange={handleSwiperChange}
      >
        {children}
      </SwiperContainer>);
}