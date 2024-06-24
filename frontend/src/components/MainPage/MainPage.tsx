import './main.scss';
import { CardType } from '../Card/Card';
import ProductSlider from '../ProductSlider';
import Carousel from '../Carousel';
import Poster from '../custom/Poster';
import { Link } from 'react-router-dom';

export interface Transition {
    leftPixels: number;
}

export const MainPage = () => {
    const cards: CardType[] = [
        {title: 'KUSHI', shortDesc: 'Футболка біла', price: '1 320 ₴', image: './images/product1.jpg'},
        {title: 'FROMUS', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product2.jpg'},
        {title: 'FROMUS2', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product3.jpg'},
        {title: 'FROMUS3', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product4.jpg'},
        {title: 'FROMUS4', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product5.jpg'}
    ];

    return (<main className="main">
        <section className="main__carousel-section main__section">
            <Carousel />
        </section>

        <section className='main__info main__section'>
            <h3 className='main__info-title'>LOGO IMAGE — інтернет магазин суконь</h3>

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
                <ProductSlider cards={cards} title='Новинки' />
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
                <ProductSlider cards={cards} title='Популярне' />
            </div>
        </section>

        <section className="main__discount main__section">
            <div className="main__discount-wrapper">
                <img src="images/Poster3.jpg" alt="Poster image" className="main__discount-img" />
            </div>
        </section>

        <section className="main__content main__section">
            <div className="main__content-slider main__content-slider--slider">
                <ProductSlider 
                    cards={cards} 
                    title='Переглянуті товари' 
                    isScroll={true}
                />
            </div>
        </section>
    </main>);
}