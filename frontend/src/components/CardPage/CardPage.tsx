import { useParams } from "react-router-dom";
import './cardPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faStar as activeStar, faHeart as activeHeart, faPlus, faMinus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import BreadCrumbs from "../custom/BreadCrumbs";
import ProductSlider from "../ProductSlider";
import { CardType } from "../Card/Card";

export interface Feedback {
    image: string;
    name: string;
    text: string;
}

export const CardPage = () => {    
    const cards: CardType[] = [
        {title: 'KUSHI', shortDesc: 'Футболка біла', price: '1 320 ₴', image: './images/product1.jpg'},
        {title: 'FROMUS', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product2.jpg'},
        {title: 'FROMUS2', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product3.jpg'},
        {title: 'FROMUS2', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product4.jpg'},
        {title: 'FROMUS2', shortDesc: 'Футболка біла', price: '550 ₴', image: './images/product5.jpg'},
    ];

    const images = [
        'images/product1.jpg',
        'images/product2.jpg',
        'images/product3.jpg'
    ];

    const sizes = [
        'XS',
        'S',
        'M',
        'L'
    ];

    const feedbacks : Feedback[] = [ 
        {
            image: 'https://avatars.githubusercontent.com/u/114987963?v=4', 
            name: 'Denys', 
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed'
        },
        {
            image: 'https://avatars.githubusercontent.com/u/114987963?v=4', 
            name: 'Denys', 
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed'
        },
        {
            image: 'https://avatars.githubusercontent.com/u/114987963?v=4', 
            name: 'Denys', 
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed'
        },
    ]; 

    const [size, setSize] = useState('');
    const [slide, setSlide] = useState(0);
    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [feedId, setFeedId] = useState(1);

    const descRef = useRef<HTMLParagraphElement>(null);

    const formStyle = useCallback((ind: number) => {
        return {
            left: `calc(-100% * ${slide - ind})`
        };
    }, [slide]);

    const feedbackStyle = {
        left: `-${(feedId - 1) * 100}%`
    };

    const descStyles = {
        maxHeight: open && descRef.current ? `${descRef.current.clientHeight + 20}px` : 0
    }

    const { cardId } = useParams();

    return (<main className="cardPage">
        <BreadCrumbs />

        <section className="cardPage__item">
            <div className="cardPage__card-image">
                <div className="cardPage__image-prevs">
                    {images.map((img, ind) => {
                        return (
                            <div 
                                className={classNames('cardPage__image-prev', {'cardPage__image-prev--active' : slide === ind})}
                                key={'im' + img}
                            >
                                <div className="cardPage__image-prev-wrapper" onClick={() => setSlide(ind)}>
                                    <img src={img} className="cardPage__image-prev-img" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="cardPage__image-container">
                    <div className="cardPage__image-wrapper">
                        {images.map((src, ind) => {
                            return (
                                <img
                                    key={'ind' + src}
                                    src={src}
                                    className="cardPage__img"
                                    style={formStyle(ind)}
                                />
                            );
                        })}
                    </div>

                    <span className={classNames('cardPage__arrow cardPage__arrow--left', 
                        {'cardPage__arrow--disabled' : slide === 0})}
                    >
                        <FontAwesomeIcon
                            width={20}
                            height={20}
                            icon={faAngleLeft}
                            onClick={() => setSlide(prev => {
                                if (prev > 0) {
                                    return prev - 1;
                                }

                                return prev;
                            })}
                        />
                    </span>

                    <span className={classNames('cardPage__arrow cardPage__arrow--right', 
                        {'cardPage__arrow--disabled' : slide === images.length - 1})}
                    >
                        <FontAwesomeIcon
                            width={20}
                            height={20}
                            icon={faAngleRight}
                            onClick={() => setSlide(prev => {
                                if (images.length - 1 > prev) {
                                    return prev + 1;
                                }

                                return prev;
                            })}
                        />
                    </span>
                </div>
            </div>

            <div className="cardPage__content">
                <h2 className="cardPage__title">Creative Depo</h2>

                <p className="cardPage__description">Футболка "Ukraine" сіра CREATIVE DEPO 696-905-0004</p>

                <div className="cardPage__data">
                    <p className="cardPage__price">1 500 ₴</p>

                    <div className="cardPage__rating">
                        <div className="cardPage__stars">
                            <div className="cardPage__star">
                                <FontAwesomeIcon width={12} height={12} icon={faStar} />
                            </div>

                            <div className="cardPage__star">
                                <FontAwesomeIcon width={12} height={12} icon={faStar} />
                            </div>

                            <div className="cardPage__star">
                                <FontAwesomeIcon width={12} height={12} icon={faStar} />
                            </div>

                            <div className="cardPage__star">
                                <FontAwesomeIcon width={12} height={12} icon={faStar} />
                            </div>

                            <div className="cardPage__star">
                                <FontAwesomeIcon width={12} height={12} icon={faStar} />
                            </div>
                        </div>

                        <p className="cardPage__feed-count">0 відгуків</p>
                    </div>

                    <div className="cardPage__sizes">
                        <h3 className="cardPage__size-title">Розмір:</h3>

                        <div className="cardPage__size-blocks">
                            {sizes.map(s => {
                                return (<div
                                            className={classNames('cardPage__size-block', 
                                                {'cardPage__size-block--active' : s === size})}
                                            key={'size' + s}
                                            onClick={() => setSize(s)}
                                        >
                                    <p className='cardPage__size-block-title'>
                                        {s}
                                    </p>
                                </div>);
                            })}
                        </div>
                    </div>

                    <div className="cardPage__buttons">
                        <button className="cardPage__add-to-cart">Додати до кошика</button>
                        <button className="cardPage__like" onClick={() => setLiked(prev => !prev)}>
                            <FontAwesomeIcon color="red" icon={liked ? activeHeart : faHeart} />
                        </button>
                    </div>

                    <div className="cardPage__info">
                        <div className="cardPage__info-wrapper">
                            <h3 className="cardPage__info-title">Опис товару</h3>

                            <div
                                className="cardPage__info-plus"
                                onClick={() => setOpen(prev => !prev)}
                            >
                                <FontAwesomeIcon icon={open ? faMinus : faPlus} />
                            </div>
                        </div>

                        <div 
                            className={classNames('cardPage__info-details', { 'cardPage__info-details--active' : open })}
                            style={descStyles}
                        >
                            <p ref={descRef}>
                                Опис продукту
                            </p>
                        </div>
                    </div>

                    <div className="cardPage__ful-description">
                        <p className="cardPage__desc-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend ante in diam hendrerit egestas. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque interdum elementum mi, vehicula facilisis elit convallis eu. Etiam placerat, massa et tempor consequat, sem diam porttitor tellus, sit amet dapibus ipsum tortor eu nulla. Nunc sit amet magna quis dui venenatis pulvinar. Aliquam dictum sit amet sem et suscipit. Suspendisse vel metus fringilla, sagittis eros quis, blandit dolor. Donec quis nibh ac neque sagittis fringilla. Nullam tincidunt nisl malesuada libero molestie vestibulum. Vestibulum ut lorem quis nibh sagittis dapibus sed vel ipsum. Nam bibendum nulla et est suscipit, pulvinar gravida mauris vulputate. Duis nec justo blandit, vulputate massa id, mollis dolor. Sed vestibulum, sem eget mollis suscipit, dolor lorem tempus dolor, id feugiat justo orci eu diam. Cras in metus massa. Nunc vel dictum metus.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="cardPage__feedbacks">
            <div className="cardPage__scroller">
                <FontAwesomeIcon
                    className="cardPage__icon"
                    icon={faChevronLeft}
                    width={12}
                    height={12}
                    color="#686D76"
                    onClick={() => setFeedId(fId => {
                        if (fId > 1) {
                            return fId - 1;
                        }

                        return fId;
                    })}
                />

                <span className="cardPage__icon-number">{feedId}</span>

                <FontAwesomeIcon
                    className="cardPage__icon"
                    icon={faChevronRight}
                    width={12}
                    height={12}
                    color="#686D76"
                    onClick={() => setFeedId(fId => {
                        if (fId < feedbacks.length) {
                            return fId + 1;
                        }

                        return fId;
                    })}
                />
            </div>

            <div className="cardPage__feedback-wrapper">
                {feedbacks.map((feed, ind) => {
                    return (
                    <div
                        className="cardPage__feedback"
                        key={ind + feed.name}
                        style={feedbackStyle}
                    >
                        <div className="cardPage__feedback-header">
                            <div className="cardPage__feedback-author">
                                <div className="cardPage__feedback-img">
                                    <img
                                        src={feed.image}
                                        className="cardPage__feedback-image"
                                    />
                                </div>
    
                                <h3 className="cardPage__feedback-name">{feed.name}</h3>
                            </div>
                                
                            <div className="cardPage__rating cardPage__rating--is-card">
                                <div className="cardPage__stars">
                                    <div className="cardPage__star">
                                        <FontAwesomeIcon color="#FFF455" width={12} height={12} icon={faStar} />
                                    </div>
    
                                    <div className="cardPage__star">
                                        <FontAwesomeIcon color="#FFF455" width={12} height={12} icon={faStar} />
                                    </div>
    
                                    <div className="cardPage__star">
                                        <FontAwesomeIcon color="#FFF455" width={12} height={12} icon={faStar} />
                                    </div>
    
                                    <div className="cardPage__star">
                                        <FontAwesomeIcon color="#FFF455" width={12} height={12} icon={faStar} />
                                    </div>
    
                                    <div className="cardPage__star">
                                        <FontAwesomeIcon color="#FFF455" width={12} height={12} icon={faStar} />
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="cardPage__feedback-body">
                            <p className="cardPage__feedback-text">
                                {feed.text}
                            </p>
                        </div>
                    </div>);
                })}
            </div>
        </section>

        <section className="cardPage__viewed">
            <ProductSlider isCard cards={cards} title='Переглянуті товари' />
        </section>
    </main>);
}