import { useContext, useEffect, useState } from 'react';
import './styles/main.scss';
import { TokenContext } from '../../../contexts/TokenContextProvider';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const AdminMainPage = () => {
    const { token, setToken } = useContext(TokenContext);
    const { pathname } = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const navigate = useNavigate();

    if (!token) {
        return <Navigate to={'/admin/login'} state={pathname} />
    }

    return (<main className='adminMain'>
        <div className="adminMain__menu" id='adminMain__menu'>
            <FontAwesomeIcon
                icon={!isOpen ? faBars : faClose}
                width={20}
                height={20}
                onClick={() => setIsOpen(prev => !prev)} 
            />
        </div>

        <section className={classNames("adminMain__navigation", { "adminMain__navigation--open" : isOpen })}>
            <h3 className='adminMain__title'>Меню</h3>

            <ul className="adminMain__nav">
                <li className="adminMain__nav-item">
                    <Link to="/admin/orders" onClick={() => setIsOpen(false)} className="adminMain__nav-link">Замовлення</Link>
                </li>
                
                <li className="adminMain__nav-item">
                    <Link to="/admin/products" onClick={() => setIsOpen(false)} className="adminMain__nav-link">Продукти</Link>
                </li>

                <li className="adminMain__nav-item">
                    <Link to="/admin/filters" onClick={() => setIsOpen(false)} className="adminMain__nav-link">Фільтри</Link>
                </li>

                <li className="adminMain__nav-item">
                    <p className="adminMain__nav-link" onClick={() => {
                        localStorage.removeItem('dressshop/token');
                        setToken('')

                        navigate('/', { replace: false });
                    }}>Вийти</p>
                </li>
            </ul>
        </section>

        <section className="adminMain__content">
            <Outlet />
        </section>
    </main>);
}

export default AdminMainPage;