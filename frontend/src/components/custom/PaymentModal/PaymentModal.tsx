import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/modal.scss';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Field from '../Field/Field';
import { useContext, useState } from 'react';
import { CartContext } from '../../../contexts/CartContextProvider';
import Loader from '../Loader/Loader';
import { addOrder } from '../../../data/httpClient';

interface Payment {
    name: string;
    surname: string;
    email: string;
    phone: string;
    deliver: string;
}

export type OrderVars = 'name' | 'surname' | 'email' | 'phone' | 'deliver';

const PaymentModal = ({ close } : {close: () => void}) => {

    const [order, setOrder] = useState<Payment>({
        name: '',
        surname: '',
        email: '',
        phone: '',
        deliver: '',
    });

    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    const { cartItems, setCartItems } = useContext(CartContext);
    const [load, setLoad] = useState(false);
    const [info, setInfo] = useState('');

    const submit = () => {
        for(const key in order) {
            if (key === 'email') {
                if (!emailRegex.test(order.email)) {
                    alert('Ведіть коректний E-mail!');
                    return;
                }
            }

            const typedKey = key as OrderVars;
            const item = order[typedKey];

            if (!item) {
                alert(`Ведіть коректний ${key}!`);
                return;
            }
        }

        setLoad(true);

        const obj = {
            ...order,
            products: cartItems.map(el => {
                return {
                    size: el.size,
                    count: el.count,
                    productId: el.id,
                }
            }),
        }

        addOrder(obj)
            .then(response => {
                setCartItems([]);
                setOrder({
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    deliver: '',
                });

                setInfo(`Замовлення #${response.id} створено!`);
            })
            .catch(() => {
                setInfo(`Помилка на сервері!`);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoad(false);
                    close();
                }, 3000);
            });
    }

    return (<div className='payment' id='payment'>
        <div className="payment__modal">
            {info && <div className="payment__dialog">
                {info}
            </div>}

            <div className="payment__modal-header">
                <h3>Оформити замовлення</h3>

                <span className='payment__close'>
                    <FontAwesomeIcon icon={faXmark} onClick={() => close()} />
                </span>
            </div>

            <div className="payment__modal-body">
                <Field
                    name='name'
                    label="Ім'я"
                    value={order.name}
                    setValue={(prop: string) => setOrder({
                        ...order,
                        name: prop,
                    })} 
                />

                <Field
                    name='surname'
                    label="Прізвище"
                    value={order.surname}
                    setValue={(prop: string) => setOrder({
                        ...order,
                        surname: prop,
                    })} 
                />

                <Field
                    name='phone'
                    label="Номер телефону"
                    value={order.phone}
                    setValue={(prop: string) => setOrder({
                        ...order,
                        phone: prop,
                    })} 
                />

                <Field
                    name='email'
                    label="E-mail"
                    type='email'
                    value={order.email}
                    setValue={(prop: string) => setOrder({
                        ...order,
                        email: prop,
                    })} 
                />

                <Field
                    name='deliver'
                    label="Доставка у..."
                    value={order.deliver}
                    setValue={(prop: string) => setOrder({
                        ...order,
                        deliver: prop,
                    })} 
                />

                <div className="payment__tabs">
                    <div className="payment__tabs-options">
                        <p 
                            className="payment__tab-option payment__tab-option--disabled"
                            title='Тимчасово заблоковано'>Оплата карткою
                        </p>

                        <p className="payment__tab-option">Оплата при отриманні</p>
                    </div>
                </div>

                <div className="payment__btn-wrapper">
                    <button
                        className='payment__btn'
                        onClick={() => submit()}
                        disabled={load}
                    >
                        {!load ? 'Підтвердити замовлення' : <Loader width={20} />}
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default PaymentModal;