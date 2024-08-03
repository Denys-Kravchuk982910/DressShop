import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './styles/navbar.scss';
import { useContext } from 'react';
import { MenuContext } from '../../contexts/MenuContextProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
    const { setOpen } = useContext(MenuContext);
    const { pathname } = useLocation();

    const navigate = useNavigate();

    return (<header>
        <nav className='navbar'>
            <div className="navbar__header">
                <div className="navbar__menu" onClick={() => setOpen(true)}>
                    <span className="navbar__menu-line"></span>

                    <span className="navbar__menu-line"></span>

                    <span className="navbar__menu-line"></span>
                </div>

                <p className="navbar__menu-email">
                    <Link
                        to="https://www.instagram.com/felitsiiabrand"
                        target='_blank'
                        className="navbar__menu-link"
                    >
                        @felitsiiabrand
                    </Link>
                </p>

                <div className="navbar__logo">
                    <div className="navbar__logo-inner"></div>
                </div>
            </div>

            <div className="navbar__nav">
                <ul className="navbar__nav-items">
                    <li className="navbar__nav-item">
                        <FontAwesomeIcon icon={faHeart} style={{color: '#C80036'}} onClick={() => navigate('/favourites')} />
                    </li>

                    <li className="navbar__nav-item">
                        <FontAwesomeIcon icon={faCartShopping} style={{color: '#ACE1AF'}} onClick={() => navigate('/cart')}/>
                    </li>
                </ul>
            </div>

            <div className="navbar__undermenu">
                <ul className="navbar__undermenu-list">
                    <li className="navbar__undermenu-item">
                        <Link 
                            to="/" 
                            className={classNames('navbar__undermenu-link', 
                                { 'navbar__undermenu-link--active' : pathname === '/' })}
                        >
                                Головна
                        </Link>
                    </li>

                    <li className="navbar__undermenu-item">
                        <Link 
                            to="/catalog" 
                            className={classNames('navbar__undermenu-link', 
                                { 'navbar__undermenu-link--active' : pathname === '/catalog' })}
                        >
                                Каталог
                        </Link>
                    </li>

                    <li className="navbar__undermenu-item">
                        <Link 
                            to="/favourites" 
                            className={classNames('navbar__undermenu-link', 
                                { 'navbar__undermenu-link--active' : pathname === '/favourites' })}
                        >
                                Фаворити
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>);
}