
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './styles/menu.scss';
import { CSSProperties, useContext, useEffect } from 'react';
import { MenuContext } from '../../contexts/MenuContextProvider';

export const Menu = () => {
    const { isOpen, setOpen } = useContext(MenuContext);

    const activeStyles = {
        left: '0',
        pointerEvents: 'all'
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    return (<aside className='menu' style={isOpen ? activeStyles as CSSProperties : {}}>        
        <div className="menu__navbar">
            <h2 className='menu__title'>Меню</h2>

            <FontAwesomeIcon style={{
                width: '28px',
                height: '28px'
            }} icon={faXmark} onClick={() => setOpen(false)}/>
        </div>

        <ul className="menu__items">
            <li className="menu__item">
                <a href="#" className="menu__link">Каталог</a>
            </li>

            <li className="menu__item">
                <a href="#" className="menu__link">Про нас</a>
            </li>

            <li className="menu__item">
                <a href="#" className="menu__link">Питання по оплаті</a>
            </li>
        </ul>

        <div className="menu__footer">
            <p className="menu__footer-desc">
                Графік роботи: ПН-ПТ 8:00 - 20:00
            </p>
        </div>
    </aside>);
}