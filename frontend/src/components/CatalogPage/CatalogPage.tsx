import { useEffect, useState } from "react";
import { Card, CardType } from "../Card/Card";
import Filter from "../custom/Filter";
import './styles/catalog.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSliders } from "@fortawesome/free-solid-svg-icons";
import FilterComponent from "../custom/FilterComponent";
import { Link } from "react-router-dom";
import BreadCrumbs from "../custom/BreadCrumbs";

export const CatalogPage = () => {
    const cards: CardType[] = [
        {title: 'KUSHI', shortDesc: 'Футболка біла', price: '1 320 ₴', image: './images/product1.jpg'},
        {title: 'FROMUS', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product2.jpg'},
        {title: 'FROMUS2', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product3.jpg'},
        {title: 'FROMUS3', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product4.jpg'},
        {title: 'FROMUS4', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product5.jpg'}
    ];

    const newsOptions = [
        'Новинки',
        'Від дешевшого',
        'Від дорожчого',
        'Зі знижкою',
    ];

    const [newsOption, setNewsOption] = useState(newsOptions[0]);
    const [filterModal, setFitlerModal] = useState(false);

    useEffect(() => {
        if (filterModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [filterModal]);


    return (<main className="catalog">
        <section className="catalog__cards">
            <BreadCrumbs />

            <div className="catalog__title-wrapper">
                <h1 className="catalog__title-content">Всі товари</h1>
            </div>


            <div className="catalog__filters">
                <Filter title="Фільтри" isRest onClick={() => setFitlerModal(prev => !prev)} />
               
                <Filter 
                    title={newsOption} 
                    options={newsOptions} 
                    setNewOption={(arg: string) => setNewsOption(arg)} 
                />

                <div className="catalog__clear-filter">
                    <FontAwesomeIcon icon={faSliders} />
                    
                    <p>Стерти фільтри</p>
                </div>
            </div>

            <div className="catalog__content">
                <div className="catalog__left-filter">
                    <div className="catalog__body">
                        <ul className="catalog__menu-list">
                            <li className="catalog__menu-item">
                                <FilterComponent title='Розмір' options={['100грн']} />
                            </li>

                            <li className="catalog__menu-item">
                                <FilterComponent title='Ціна' options={['100грн']} />
                            </li>

                            <li className="catalog__menu-item">
                                <FilterComponent title='Колір' options={['100грн']} />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="catalog__content-items">
                    {cards.map((card, index) => {
                        return (<div className="catalog__item" key={'card' + index}>
                            <Card 
                                title={card.title} 
                                shortDesc={card.shortDesc}
                                price={card.price}
                                image={card.image}
                            />
                        </div>);
                    })}
                </div>
            </div>

            <div className="catalog__btn-wrapper">
                <p className="catalog__page-count">Зараз на сторінці 5 з 5 товарів</p>

                <button className="catalog__btn">Показати більше</button>
            </div>
        </section>

        {filterModal && <section className="catalog__modal">
            <div className="catalog__header">
                <p className="catalog__title">Фільтри</p>

                <FontAwesomeIcon style={{
                    width: '16px',
                    height: '16px'
                }} icon={faXmark} onClick={() => setFitlerModal(false)}/>
            </div>

            <div className="catalog__body">
                <ul className="catalog__menu-list">
                    <li className="catalog__menu-item">
                        <FilterComponent title='Розмір' options={['100грн']} />
                    </li>

                    <li className="catalog__menu-item">
                        <FilterComponent title='Ціна' options={['100грн']} />
                    </li>

                    <li className="catalog__menu-item">
                        <FilterComponent title='Колір' options={['100грн']} />
                    </li>
                </ul>
            </div>

            <div className="catalog__btns">
                <button className="catalog__btn" onClick={() => setFitlerModal(false)}>
                    Застосувати фільтри
                </button>

                <button className="catalog__btn catalog__btn--white" onClick={() => setFitlerModal(false)}>
                    Відмінити фільтри
                </button>
            </div>
        </section>}
    </main>);
}