import { useNavigate } from 'react-router-dom';
import './styles/style.scss';
import { ProductType } from '../../contexts/ProductContextProvider';
import { serverLink } from '../../data/httpClient';

export const Card: React.FC<ProductType> = ({ title, shortDesc, price, images, id }) => {
    const defaultImage = 'images/no-image.png'

    const imagesStorage = serverLink + 'images/';

    const navigate = useNavigate();

    return (<div className="card" onClick={() => {
        window.scrollTo(0, 0);

        navigate(`/card/${id}`);
    }}>
        <div className="card__image-wrapper">
            <img 
                src={images[0] ? imagesStorage + images[0] : defaultImage} 
                alt="Image" 
                className="card__image-entity"
            />
        </div>

        <div className="card__content">
            <h3 className="card__title">{title}</h3>

            <p className="card__desc">{shortDesc}</p>

            <p className="card__price">{price} ₴</p>
        </div>
    </div>);
}