import { useEffect } from 'react';
import './styles/pagination.scss';
import classNames from 'classnames';
// import 'bulma/css/bulma.css';

export interface PaginationType {
    page: number;
    count: number;
    setPage: (num: number) => void;
}

export const Pagination: React.FC<PaginationType> = ({ page, count, setPage }) => {
    const pages : number[] = [];

    for (let i = 0; i < count; i++) {
        pages.push(i + 1);
    }

    const anchorClickHandler = (current: number) => {
        setPage(current);
    }

    return (<nav className="pagination" role="navigation" aria-label="pagination">
        <ul className="pagination__list">
            {pages.map(numPage => {
                return (<li key={'page' + numPage}>
                    <a
                        onClick={() => anchorClickHandler(numPage)} 
                        className={classNames('pagination__link', 
                            { 'pagination__link--active' : numPage === page }
                        )}
                    >
                        {numPage}
                    </a>
                </li>);
            })}
        </ul>
    </nav>);
}