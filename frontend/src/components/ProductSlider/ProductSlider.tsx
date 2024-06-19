import { SwiperSlide } from "swiper/react";
import BlockHeader from "../custom/BlockHeader";
import HorizontalScroller from "../custom/HorizontalScroller";
import Card from "../Card";
import { CardType } from "../Card/Card";
import { useEffect, useState } from "react";
import classNames from "classnames";

import './styles/pSlider.scss';
import Pagination from "../custom/Pagination";

export interface ProductSliderType {
    cards: CardType[];
    title: string;
    isScroll?: boolean;
}

export const ProductSlider : React.FC<ProductSliderType> = ({ cards, title, isScroll }) => {
    const [slide, setSlide] = useState(0);
    const [perPage, setPerPage] = useState(2.3);
    const [page, setPage] = useState(1);

    const pages = cards.length - Math.floor(perPage) + 1;

    const handleResize = () => {
        if (window.innerWidth < 768) {
            if (perPage !== 2.3) {
                setPerPage(2.3);
            }
        } else if (window.innerWidth < 1280) {
            if (perPage !== 3) {
               setPerPage(3);
            }
        } else if (window.innerWidth >= 1280) {
            if (perPage !== 4) {
               setPerPage(4);
            }
        }

        if (slide > pages) {
            setSlide(pages);
        }
    }

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [perPage]);

    const getCardsUsingPagination = (page: number) => {
        return cards.slice((page - 1) * 4, page * 4);
    }

    return (<>
        <BlockHeader 
            title={title} 
            slide={slide} 
            setSlide={setSlide} 
            count={pages}
        />

        <div className="pSlider__news-container">
            {perPage < 4 ? <HorizontalScroller
                slide={slide} 
                setSlide={(slideIndex: number) => setSlide(slideIndex)}
                perPage={perPage}
            >
                {cards.map((card, index) => {
                    return (<SwiperSlide key={'card' + index}>
                        <Card 
                        title={card.title} 
                        shortDesc={card.shortDesc} 
                        price={card.price} 
                        image={card.image} 
                        />
                    </SwiperSlide>);
                    })}
            </HorizontalScroller> : 
            <><div className={classNames('pSlider__cards', { 'pSlider__cards--scroll' : isScroll })}>
                {getCardsUsingPagination(page).map((card, index) => {
                    return (<Card 
                        key={'card' + index}
                        title={card.title} 
                        shortDesc={card.shortDesc} 
                        price={card.price} 
                        image={card.image} 
                        />);
                    })}
            </div>
            <div className="pSlider__pagination">
                    <Pagination 
                        page={page} 
                        count={Math.ceil(cards.length / 4)} 
                        setPage={(num: number) => setPage(num)} 
                    />
                </div>
            </>}
        </div>
    </>);
}