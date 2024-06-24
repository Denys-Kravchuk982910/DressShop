import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/filterCom.scss';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import classNames from 'classnames';

export interface FilterType {
    title: string;
    options: string[];
}

export const FilterComponent : React.FC<FilterType> = ({ title, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const styles = {
        maxHeight: `calc(42px * ${options.length})`
    };

    return (<div className='filterCom'>
        <div className="filterCom__menu-wrapper">
            <a className="filterCom__menu-link">{title}</a>

            <span className="filterCom__menu-plus">
                {!isOpen && <FontAwesomeIcon icon={faPlus} width={15} height={15} onClick={() => setIsOpen(true)} />}
                {isOpen && <FontAwesomeIcon icon={faMinus} width={15} height={15} onClick={() => setIsOpen(false)} />}
            </span>
        </div>

        <ul className={classNames('filterCom__list')} style={isOpen ? styles : {}}>
            <li className="filterCom__item">
                <a href="" className="filterCom__link">100 грн</a>
            </li>
        </ul>
    </div>);
}