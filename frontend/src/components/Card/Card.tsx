import './styles/style.scss';

export interface CardType {
    title: string;
    shortDesc: string;
    price: string;
    image: string;
}

export const Card: React.FC<CardType> = ({ title, shortDesc, price, image }) => {

    const defaultImage = 'images/no-image.png'

    return (<div className="card">
        <div className="card__image-wrapper">
            <img 
                src={image || defaultImage} 
                alt="Image" 
                className="card__image-entity"
            />
        </div>

        <div className="card__content">
            <h3 className="card__title">{title}</h3>

            <p className="card__desc">{shortDesc}</p>

            <p className="card__price">{price}</p>
        </div>
    </div>);
}