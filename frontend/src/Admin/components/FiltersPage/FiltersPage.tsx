import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './styles/filters.scss';
import { getFilter } from '../../../data/httpClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { acceptFilterOnServer, editFilterOnServer, removeFilterFromServer } from '../../http/AdminHttpClient';
import { TokenContext } from '../../../contexts/TokenContextProvider';

export type Filter = {
    id: number;
    title: string;
    category: string;
    status: string;
};
  
type FiltersState = {
    [key: string]: Filter;
};

const FiltersPage = () => {
    const { token } = useContext(TokenContext);

    const [filters, setFilters] = useState<FiltersState>({});
    const [activeFilter, setActiveFilter] = useState<string|null>(null);

    const timerId = useRef<number>();

    const isEdited = useCallback((key: string) => {
        if (activeFilter !== null) {
            return activeFilter !== key;
        }

        return false;
    }, [activeFilter, filters]);

    const changeFilter = (key: string, id: number, value: string, valOpts: Filter) => {
        setActiveFilter(key + id + value);

        if (timerId.current) {
            window.clearTimeout(timerId.current);
        }

        timerId.current = window.setTimeout(() => {
            if (valOpts.status === 'done') {
                editFilterOnServer(token, {...valOpts, [key]: value});
            }

            setActiveFilter(null);
        }, 2000);

        setFilters(prev => ({
            ...prev,
            [id]: {...valOpts, [key]: value}
        }))
    };

    const getMaxId = (values: Filter[]) => {
        const id = values.sort((a, b) => -a.id + b.id)[0].id + 1;

        return id;
    }

    const addToTable = () => {
        setFilters(prev => ({...prev, [getMaxId(Object.values(prev))] : {
            id: getMaxId(Object.values(prev)),
            category: '',
            title: '',
            status: 'process'
        }}));
    }

    const removeFromTable = async (id: number) => {
        const keys = Object.keys(filters).filter(x => x !== id.toString());
        const obj: FiltersState = {};

        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = filters[keys[i]];
        }

        if (filters[id].status === 'done') {
            await removeFilterFromServer(token, id);
        }

        setFilters(obj);

    }

    const acceptFilter = (obj: Filter) => {
        if (obj.title && obj.category) {
            acceptFilterOnServer(token, obj)
            .then(response => {
                setFilters(prev => ({
                    ...prev,
                    [obj.id]: {
                        ...obj,
                        title: response.title,
                        category: response.category,
                        status: 'done'
                    }
                }));
            })
        } else {
            alert('Поля не можуть бути пустими!')
        }
    }

    useEffect(() => { 
        getFilter().then(response => {
            const finalFilters: FiltersState = {};

            for (const fB of response) {
                for (const filter of fB.filters) {
                    finalFilters[`${filter.id.toString()}`] = 
                        { 
                            id: filter.id,
                            title: filter.title,
                            category: fB.category,
                            status: 'done'
                        };
                }
            }

            setFilters(finalFilters);
        });
    }, []);

    return (<div className='adminFilters'>
        <table className="adminFilters__table">
            <thead className="adminFilters__table-header">
                <tr>
                    <th className='adminFilters__table-title'>Назва фільтра</th>
                    <th className='adminFilters__table-title'>Категорія</th>
                    <th className='adminFilters__table-title adminFilters__table-title--tools'>Інструменти</th>
                </tr>
            </thead>

            <tbody>
                {Object.entries(filters).map(([key, value]) => {
                    return (
                        <tr key={key}>
                            <td className='adminFilters__table-text'>
                                <input
                                    type='text'
                                    className='adminFilters__table-input'
                                    value={value.title}
                                    disabled={isEdited('title' + value.id + value.title)}
                                    onChange={e => {
                                        changeFilter('title', value.id, e.target.value, value);
                                    }}
                                />
                            </td>

                            <td className='adminFilters__table-text'>
                                <input
                                    type='text'
                                    className='adminFilters__table-input'
                                    value={value.category}
                                    disabled={isEdited('category' + value.id + value.category)}
                                    onChange={e => {
                                        changeFilter('category', value.id, e.target.value, value);
                                    }}
                                />
                            </td>

                            <td className='adminFilters__table-text adminFilters__table-text--tools'>
                                {value.status !== 'done' && <FontAwesomeIcon
                                    icon={faSquareCheck}
                                    color={'#88d66c'}
                                    className='adminFilters__close'
                                    onClick={() => acceptFilter(value)}
                                />}

                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    color={'#f50'}
                                    className='adminFilters__close'
                                    onClick={() => removeFromTable(value.id)}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>

            <tfoot>
                <tr>
                    <td>
                        <button className='adminFilters__add' onClick={addToTable}>Додати елемент</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>);
}

export default FiltersPage;