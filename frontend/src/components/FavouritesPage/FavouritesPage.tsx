import { useContext } from "react";
import { Card } from "../Card/Card";
import './FavouritesPage.scss';
import { LikedContext } from "../../contexts/LikedContextProvider";

export const FavouritesPage = () => {
    const { likedProducts } = useContext(LikedContext);

    return (<main className="favourites">
        <h1 className="favourites__title">Товари, що сподобались</h1>

        {likedProducts.length === 0 && 
            <p className="favourites__content">У вас поки немає фаворитів...</p>
        }

        {likedProducts.length > 0 && <div className="favourites__content-items">
            {likedProducts.map((card, index) => {
                return (<div className="favourites__item" key={'card' + index}>
                    <Card {...card} />
                </div>);
            })}
        </div>}
    </main>);
}