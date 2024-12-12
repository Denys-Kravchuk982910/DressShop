import './main.scss';
import ProductSlider from '../ProductSlider';
import Carousel from '../Carousel';
import Poster from '../custom/Poster';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductContext, ProductType } from '../../contexts/ProductContextProvider';
import { getProductsByCustomLink, serverLink } from '../../data/httpClient';
import { LoaderContext } from '../../contexts/LoaderContextProvider';
import { ViewedProductContext } from '../../contexts/ViewedProductContextProvider';

export interface Transition {
    leftPixels: number;
}

export const MainPage = () => {
    const { setLoad } = useContext(LoaderContext);
    const { viewed } = useContext(ViewedProductContext);

    const [newsCards, setNewsCards] = useState<ProductType[]>([]);
    const [popularCards, setPopularCards] = useState<ProductType[]>([]);

    useEffect(() => {
      const newsCardsLink = `${serverLink}api/product/get?page=1`;  
      const popularCardsLink = `${serverLink}api/product/get?page=1&order=rate`;

      setLoad(true);
      
      Promise.all([
        getProductsByCustomLink(newsCardsLink).then(setNewsCards),
        getProductsByCustomLink(popularCardsLink).then(setPopularCards)
      ])
        .finally(() => {
            setLoad(false);
        });
    }, []);

    return (<main className="main">
        <section className="main__carousel-section main__section">
            <Carousel />
        </section>

        <section className='main__info main__section'>
            <h3 className='main__info-title'>Felitsiia — український бренд одягу</h3>

            <div className="main__catalog-btns">
                <Link to="/catalog" className='main__catalog-btn'>Перейти у каталог</Link>
            </div>
        </section>

        <section className="main__poster main__section">
            <Poster url='images/Poster.jpg' />
        </section>

        <section className="main__content main__section">
            <div className="main__content-poster">
                <Poster url='images/Poster.jpg' />
            </div>

            <div className="main__content-slider">
                <ProductSlider cards={newsCards} title='Новинки' />
            </div>
        </section>

        <section className="main__poster main__section">
            <Poster url='images/Poster2.jpg' />
        </section>

        <section className="main__content main__section">
            <div className="main__content-poster main__content-poster--right">
                <Poster url='images/Poster2.jpg' />
            </div>

            <div className="main__content-slider main__content-slider--left">
                <ProductSlider cards={popularCards} title='Популярне' />
            </div>
        </section>

        <section className="main__discount main__section">
            <div className="main__discount-wrapper">
                <img src="images/Slider1.svg" alt="Poster image" className="main__discount-img" />
            </div>
        </section>

        {viewed.length > 0 && <section className="main__content main__section">
            <div className="main__content-slider main__content-slider--slider">
                <ProductSlider 
                    cards={viewed} 
                    title='Переглянуті товари' 
                    isScroll={true}
                />
            </div>
        </section>}
    </main>);
}