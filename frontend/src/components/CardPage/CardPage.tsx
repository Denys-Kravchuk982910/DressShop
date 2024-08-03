import { Navigate, useParams } from "react-router-dom";
import './cardPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faStar as activeStar, faHeart as activeHeart, faPlus, faMinus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import BreadCrumbs from "../custom/BreadCrumbs";
import ProductSlider from "../ProductSlider";
import { Feedback, ProductContext, ProductType } from "../../contexts/ProductContextProvider";
import { ViewedProductContext } from "../../contexts/ViewedProductContextProvider";
import { getProducts, serverLink } from "../../data/httpClient";
import { CartContext } from "../../contexts/CartContextProvider";
import { LikedContext } from "../../contexts/LikedContextProvider";

export const CardPage = () => {    
    const { viewed, setViewed } = useContext(ViewedProductContext);
    const { cartItems, setCartItems } = useContext(CartContext);
    const { likedProducts, setLikedProducts } = useContext(LikedContext);

    const imagesStorage = serverLink + 'images/';

    const { cardId } = useParams();

    const [currentCard, setCurrentCard] = useState<ProductType>({
        id: 0,
        title: '',
        shortDesc: '',
        price: 0,
        images: [],
        description: '',
        sizes: [],
        rating: 0,
        feedbacks: [],
    });

    useEffect(() => {
        getProducts().then(response => {
            const curr = response.find(c => c.id === parseInt(cardId || '0'));

            if (curr) {   
                setCurrentCard(curr);
            }
        });
    }, [cardId]);

    useEffect(() => {
        if (!viewed.find(c => c.id === currentCard.id) && currentCard.id !== 0) {
            setViewed([...viewed, currentCard]);
        }
    }, [currentCard]);

    const images = currentCard.images;
    const sizes = currentCard.sizes;

    const feedbacks : Feedback[] = currentCard.feedbacks; 

    const [size, setSize] = useState('');
    const [slide, setSlide] = useState(0);
    const [open, setOpen] = useState(false);
    const [feedId, setFeedId] = useState(1);
    const [errorSize, setErrorSize] = useState(false);

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

    const getActiveAndDisabled = () => {
        const active: number[] = [];
        const disabled: number[] = [];

        for (let i = 0; i < currentCard.rating; i++) {
            active.push(i + 1);
        }

        for (let i = 0; i < 5 - currentCard.rating; i++) {
            disabled.push(i + 1);
        }

        return {
            active: active,
            disabled: disabled
        } as { active: number[], disabled: number[] };
    }

    const isInCart = useMemo(() => cartItems
        .find(el => el.id === currentCard.id && el.size === size),
        [currentCard, cartItems, size]);

    const isInLiked = useMemo(() => likedProducts
        .find(el => el.id === currentCard.id),
        [currentCard, likedProducts]);

    const cartBtnText = useMemo(() => isInCart ? 'Додано в кошик': 'Додати в кошик', [isInCart]);

    const addToCart = () => {
        if (!size) {
            setErrorSize(true);

            return;
        }

        if (!isInCart) {
            setCartItems([...cartItems, {...currentCard, size: size, count: 1}]);
        } else {
            setCartItems([...cartItems
                .filter(c => !(c.id === currentCard.id && c.size === size))]);
        }
    }

    const addToLike = () => {
        if (!isInLiked) {
            setLikedProducts([...likedProducts, currentCard]);
        } else {
            setLikedProducts([...likedProducts.filter(pr => pr.id !== currentCard.id)]);
        }
    }

    return (<main className="cardPage">
        <BreadCrumbs />

        <section className="cardPage__item">
            <div className="cardPage__image-prevs">
                {images.map((img, ind) => {
                    return (
                        <div 
                            className={classNames('cardPage__image-prev', {'cardPage__image-prev--active' : slide === ind})}
                            key={'im' + img}
                        >
                            <div className="cardPage__image-prev-wrapper" onClick={() => setSlide(ind)}>
                                <img src={imagesStorage + img} className="cardPage__image-prev-img" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cardPage__card-image">
                <div className="cardPage__image-container">
                    <div className="cardPage__image-wrapper">
                        {images.map((src, ind) => {
                            return (
                                <img
                                    key={'ind' + src}
                                    src={imagesStorage + src}
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
                <h2 className="cardPage__title">{currentCard.title}</h2>

                <p className="cardPage__description">{currentCard.shortDesc}</p>

                <div className="cardPage__data">
                    <p className="cardPage__price">{currentCard.price} ₴</p>

                    <div className="cardPage__rating">
                        <div className="cardPage__stars">
                            {getActiveAndDisabled().active.map((act, ind) => {
                                return (<div className="cardPage__star" key={act + ind}>
                                    <FontAwesomeIcon width={12} height={12} icon={activeStar} />
                                </div>);
                            })}

                            {getActiveAndDisabled().disabled.map((act, ind) => {
                                return (<div className="cardPage__star" key={act + ind}>
                                    <FontAwesomeIcon width={12} height={12} icon={faStar} />
                                </div>);
                            })}
                        </div>

                        <p className="cardPage__feed-count">{currentCard.feedbacks.length} відгуків</p>
                    </div>

                    <div className="cardPage__sizes">
                        <h3 className="cardPage__size-title">Розмір:</h3>

                        <div className="cardPage__size-blocks">
                            {sizes.map(s => {
                                return (<div
                                            className={classNames('cardPage__size-block', 
                                                {'cardPage__size-block--active' : s === size})}
                                            key={'size' + s}
                                            onClick={() => {
                                                setSize(s);

                                                if (errorSize)
                                                    setErrorSize(false);
                                            }}
                                        >
                                    <p className='cardPage__size-block-title'>
                                        {s}
                                    </p>
                                </div>);
                            })}
                        </div>

                        <p 
                            className={classNames("cardPage__size-error", 
                            { "cardPage__size-error--active" : errorSize})}
                        >
                            Оберіть розмір
                        </p>
                    </div>

                    <div className="cardPage__buttons">
                        <button
                            className={classNames("cardPage__add-to-cart", 
                                { "cardPage__add-to-cart--active" : isInCart })
                            }
                            onClick={addToCart}
                        >
                            {cartBtnText}
                        </button>

                        <button
                            className="cardPage__like"
                            onClick={addToLike}
                        >
                            <FontAwesomeIcon color="red" icon={isInLiked ? activeHeart : faHeart} />
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
                        key={ind + feed.author}
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
    
                                <h3 className="cardPage__feedback-name">{feed.author}</h3>
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
                                {feed.comment}
                            </p>
                        </div>
                    </div>);
                })}
            </div>
        </section>

        {viewed.filter(c => c.id !== currentCard.id).length > 0 && <section className="cardPage__viewed">
            <ProductSlider
                isCard
                cards={viewed.filter(c => c.id !== currentCard.id)}
                title='Переглянуті товари'
            />
        </section>}
    </main>);
}