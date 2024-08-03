import { useContext, useEffect, useState } from 'react';
import '../../../utils/mixins.scss';
import './styles/products.scss';
import { ProductType } from '../../../contexts/ProductContextProvider';
import { serverLink } from '../../../data/httpClient';
import { deleteProduct, getProducts } from '../../http/AdminHttpClient';
import { TokenContext } from '../../../contexts/TokenContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    const [cards, setCards] = useState<ProductType[]>([]);
    const imageServer = serverLink + 'images/';

    useEffect(() => {
        getProducts(token).then(setCards);
    }, []);
    
    return (<div className='adminProducts'>
        <div className="adminProducts__panel">
            <Link to="/admin/product" className="adminProducts__panel-btn">Додати</Link>
        </div>

        <div className="adminProducts__container">
            {cards.map(card => 
                <div
                    className="adminProducts__card"
                    key={'admin_card' + card.id}
                    onClick={() => navigate('/admin/product/' + card.id)}
                >
                    <div className="adminProducts__card-img">
                        <img src={imageServer + card.images[0]} alt="card Image" className="adminProducts__card-image" />
                    </div>

                    <div className="adminProducts__card-content">
                        <h3>{card.title}</h3>
                        <p>Тег: {card.shortDesc}</p>
                        <p>Ціна: {card.price}</p>
                        <p>Рейтинг: {card.rating}</p>
                    </div>

                    <div className="adminProducts__card-btns">
                        <div className="adminProducts__card-btn">
                            <FontAwesomeIcon
                                title='Видалити'
                                icon={faClose}
                                color='#f50'
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    deleteProduct(token, card.id)
                                        .then(() => {
                                            setCards(prev => [...prev.filter(x => x.id !== card.id)]);
                                        });
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>);
}

export default ProductsPage;