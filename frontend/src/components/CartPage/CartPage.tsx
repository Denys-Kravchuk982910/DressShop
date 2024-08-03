import { useContext, useState } from 'react';
import './CartPage.scss';
import { CartContext } from '../../contexts/CartContextProvider';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { serverLink } from '../../data/httpClient';
import PaymentModal from '../custom/PaymentModal/PaymentModal';

export const CartPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const [isOpen, setOpen] = useState(false);

    const removeCartItem = (id: number, size: string) => {
        setCartItems(cartItems.filter(el => !(el.id === id && el.size === size)));
    };

    const changeCount = (param: string, id: number, size: string) => {
        const cartItem = cartItems.find(el => (el.id === id && el.size === size));
        const cartItemId = cartItems.findIndex(el => (el.id === id && el.size === size));

        if (cartItem) {
            switch (param) {
                case 'plus': {
                    cartItem.count++;
    
                    break;
                }
    
                case 'minus': {
                    if (cartItem.count > 1) {
                        cartItem.count--;
                    }

                    break;
                }
            }

            setCartItems([...cartItems.slice(0, cartItemId),
                cartItem, 
                ...cartItems.slice(cartItemId + 1, cartItems.length)
            ]);
        }
    };

    const sum = cartItems
        .reduce((prev, curr) => prev + curr.price * curr.count, 0);

    const count = cartItems
        .reduce((prev, curr) => prev + curr.count, 0);

    const imagesStorage = serverLink + 'images/';

    return (<main className='cart'>
        {isOpen && <PaymentModal close={() => setOpen(false)} />}

        <h1 className='cart__title'>Кошик</h1>

        <section className="cart__items">
            {cartItems.map((value, ind) => {
                return (<div className="cart__item" key={ind + value.title}>
                    <div className="cart__close" onClick={() => removeCartItem(value.id, value.size)}></div>

                    <div className="cart__image-wrapper">
                        <img className="cart__image-src" src={imagesStorage + value.images[0]} />
                    </div>

                    <div className="cart__text-wrapper">
                        <h3 className="cart__text-title">{value.title} ({value.size})</h3>

                        <p className="cart__text-desc">{value.shortDesc}</p>

                        <p className="cart__text-price">{value.price} ₴</p>
                    </div>

                    <div className="cart__counter">
                        <button
                            className='cart__count cart__count--minus'
                            onClick={() => changeCount('plus', value.id, value.size)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>

                        <p className='cart__number'><span>{value.count}</span></p>

                        <button
                            className='cart__count cart__count--minus'
                            onClick={() => changeCount('minus', value.id, value.size)}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                </div>);
            })}
        </section>

        <section className="cart__button-wrapper">
            <div className="cart__sum">
                <h2 className='cart__sum-title'>
                    {sum} ₴
                </h2>

                <p className="cart__sum-desc">Загальна кількість: {count}</p>
                
                <button
                    className="cart__btn"
                    disabled={count === 0}
                    onClick={() => {
                        setOpen(true);
                        window.scrollTo(0, 0);
                    }}
                >
                    Оформити замовлення
                </button>
            </div>

        </section>
    </main>);
}