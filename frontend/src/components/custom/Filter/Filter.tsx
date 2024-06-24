import { useRef, useState } from 'react';
import './styles/filter.scss';
import classNames from 'classnames';

export interface FitlerType {
    title: string;
    options?: string[];
    setNewOption?: (arg: string) => void;
    onClick?: () => void; 
    isRest?: boolean;
}

export const Filter : React.FC<FitlerType> = ({ title, options, setNewOption, onClick, isRest = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsOpen(prev => !prev);
    }

    const handleLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, title: string) => {    
        e.preventDefault();
        e.stopPropagation();

        if (setNewOption) {
            setTimeout(() => {
                setNewOption(title);
            }, 300);

            setIsOpen(false);
        }
    }

    return (<div className={classNames('filter', {'filter__hide' : isRest})} onClick={onClick}>
        <div className="filter__container" ref={filterRef} onClick={handleClick}>
            <p className="filter__filter-name">{title}</p>

            <svg className={classNames('filter__caret', {'filter__caret--down' : isOpen && !onClick})} xmlns="http://www.w3.org/2000/svg" fill="#374151" viewBox="0 0 320 512">
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
            </svg>
        </div>
        
        {options && <ul 
                className={classNames('filter__options', { 'filter__options--active' : isOpen})}
                style={{
                    width: filterRef.current?.offsetWidth
                }}
            >
            {options.filter(opt => opt !== title).map((option, index) => {
                return (
                    <li className="filter__option" key={'option' + index}>
                        <a href="/" className="filter__link" onClick={e => handleLink(e, option)}>{option}</a>
                    </li>
                );
            })}
        </ul>}
    </div>);
}