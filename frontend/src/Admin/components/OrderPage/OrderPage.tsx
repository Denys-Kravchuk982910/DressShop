import { useContext, useEffect, useState } from "react";
import { changeStatusOrder, getOrders, removeOrder } from "../../http/AdminHttpClient";
import { TokenContext } from "../../../contexts/TokenContextProvider";
import { OrderData } from "../../http/types/LoginTypes";
import './orders.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { serverLink } from "../../../data/httpClient";
import classNames from "classnames";

const OrderPage = () => {
    const { token } = useContext(TokenContext);

    const [orders, setOrders] = useState<OrderData[]>([]);
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        getOrders(token)
            .then(setOrders);
    }, [token]);

    const removeOrderServer = (orderId: number) => {
        removeOrder(token, orderId)
        .then(() => setOrders(prev => prev.filter(x => x.id !== orderId)));
    }

    const changeStatus = (id: number, status: 'active' | 'done') => {
        changeStatusOrder(token, status, id)
            .then(() => {
                const orIndex = orders.findIndex(x => x.id === id);
                const or = orders[orIndex];

                or.status = status;

                setOrders(prev => [...prev.slice(0, orIndex),
                    or,
                    ...prev.slice(orIndex + 1, prev.length)]);
            });
    }

    return (<div className="adminOrders">
        <div className="adminOrders__sort">
            <button
                className={classNames("adminOrders__btn", { "adminOrders__btn--active" : sortBy === '' })}
                onClick={() => setSortBy('')}
            >
                Всі
            </button>

            <button
                className={classNames("adminOrders__btn", { "adminOrders__btn--active" : sortBy === 'done' })}
                onClick={() => setSortBy('done')}
            >
                Виконані
            </button>

            <button
                className={classNames("adminOrders__btn", { "adminOrders__btn--active" : sortBy === 'active' })}
                onClick={() => setSortBy('active')}
            >
                Активні
            </button>
        </div>

        <div className="adminOrders__container">
            {orders.filter(order => order.status.includes(sortBy)).map((order, key) => {
                return (
                    <div className="adminOrders__order" key={order.id + key}>
                        <div className="adminOrders__header">
                            <div className="adminOrders__header-title">
                                <h2>{order.name} {order.surname}</h2>
                                <p>{order.phone} - {order.email}</p>

                                <p className={`adminOrders__header-status adminOrders__header-status--${order.status}`}>
                                    {order.status}
                                </p>
                            </div>

                            <div className="adminOrders__order-icons">
                                <p className="adminOrders__product-icon">
                                    {order.status === 'active' ?
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            color="#87d068"
                                            onClick={() => changeStatus(order.id, 'done')}
                                        />
                                        : <FontAwesomeIcon
                                            icon={faArrowDown}
                                            color="#f50"
                                            onClick={() => changeStatus(order.id, 'active')}
                                        />
                                    }
                                </p>

                                {/* <p className="adminOrders__product-icon" onClick={() => removeOrderServer(order.id)}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </p> */}
                            </div>
                        </div>
                        

                        <div className="adminOrders__products">
                            {order.products.map((product, key) => {
                                return (
                                    <div className="adminOrders__product" key={'product' + key + product.product.id}>
                                        <img
                                            src={serverLink + 'images/' + product.product.image}
                                            alt="Фото"
                                            className="adminOrders__product-image"
                                        />

                                        <p className="adminOrders__product-text">{product.product.title}</p>
                                        <p className="adminOrders__product-text">{product.product.tag}</p>
                                        <p className="adminOrders__product-text">Кількість: {product.product.count}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="adminOrders__total">
                            Вартість: {order.products.reduce((prev, curr) => prev + curr.product.price * curr.count, 0)} грн
                        </div>
                    </div>
                )
            })}
        </div>
    </div>);
}

export default OrderPage;