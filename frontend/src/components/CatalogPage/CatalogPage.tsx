import { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import Filter from "../custom/Filter";
import './styles/catalog.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSliders } from "@fortawesome/free-solid-svg-icons";
import FilterComponent from "../custom/FilterComponent";
import BreadCrumbs from "../custom/BreadCrumbs";
import { FilterBlock, ProductContext } from "../../contexts/ProductContextProvider";
import { getCount, getFilter, getProducts } from "../../data/httpClient";
import { LoaderContext } from "../../contexts/LoaderContextProvider";

export const CatalogPage = () => {
    const { cards, setCards } = useContext(ProductContext);

    const newsOptions = [
        'Новинки',
        'Від дешевшого',
        'Від дорожчого',
        'За рейтингом',
    ];

    const { setLoad } = useContext(LoaderContext);
    
    const [newsOption, setNewsOption] = useState(newsOptions[0]);
    const [filterModal, setFitlerModal] = useState(false);
    const [filterBlock, setFilterBlock] = useState<FilterBlock[]>([]);
    const [checked, setChecked] = useState<string[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [spec, setSpec] = useState<string|null>(null);
    
    const showMore = () => {
        if(cards.length < count) {
            getProducts(page + 1)
            .then(resp => {
                setPage(prev => prev + 1);

                setCards([...cards, ...resp]);
            });
        }
    }

    const sortBy = (arg: string) => {
        setNewsOption(arg);

        let tempSpec = '';

        switch(arg) {
            case newsOptions[0]: {
                tempSpec = 'default';
                break;
            }

            case newsOptions[1]: {
                tempSpec = 'priceDown'
                break;
            }

            case newsOptions[2]: {
                tempSpec = 'priceTop'
                break;
            }

            case newsOptions[3]: {
                tempSpec = 'rate'
                break;
            }
        }

        tempSpec && setSpec(prev => {
            const params = prev !== null ? prev.split('&').filter(x => x).filter(x => !x.startsWith('order'))
                .reduce((prev, curr) => prev + '&' + curr , '') : '';

            return params + `&order=${tempSpec}`;
        });
    }

    const setFiletedProducts = useCallback(async (sp: string, page: number) => {
        const newCardsI = [];

        for (let i = 1; i <= page; i++) {                
            const resp = await getProducts(i, sp);

            newCardsI.push(...resp);
        }

        setCards([...newCardsI]);
        setLoad(false);
    }, []);

    const editFilters = (filter: string) => {
        if (checked.includes(filter)) {
            setChecked(prev => {
                const current = prev.filter(x => x !== filter);

                setFilters(current);

                return current;
            });
        } else {
            setChecked(prev => {
                const current = [...prev, filter];

                setFilters(current);

                return current;
            });
        }
    }

    const setFilters = useCallback((checkedCustom: string[]) => {
        const specTemp = spec !== null ? spec.split('&').filter(temp => temp.startsWith('order'))[0] : '';

        let tempSpec = '';
        if (specTemp) {
            tempSpec += '&' + specTemp;
        }

        for (const check of checkedCustom) {
            tempSpec += '&category=' + check;
        }

        setSpec(tempSpec);
    }, [spec]);

    const clearFilters = useCallback(() => {
        const specTemp = spec !== null ? spec.split('&').filter(temp => temp.startsWith('order'))[0] : '';

        let tempSpec = '';
        if (specTemp) {
            tempSpec += '&' + specTemp;
        }
        
        setSpec(tempSpec);
        setChecked([]);
    }, [spec]);

    useEffect(() => {
        setLoad(true);

        spec !== null && setFiletedProducts(spec, page);
    }, [spec]);

    useEffect(() => {
        setLoad(true);

        Promise.all([
            getCount().then(data => {
                setCount(data.length);
            }),
    
            getFilter().then(filters => {
                setFilterBlock(filters);
            })
        ])
        .finally(() => setLoad(false));
    }, []);

    useEffect(() => {
        if (filterModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [filterModal]);


    return (<main className="catalog">
        <section className="catalog__cards">
            <BreadCrumbs />

            <div className="catalog__title-wrapper">
                <h1 className="catalog__title-content">Всі товари</h1>
            </div>

            <div className="catalog__filters">
                <Filter title="Фільтри" isRest onClick={() => setFitlerModal(prev => !prev)} />
               
                <Filter 
                    title={newsOption} 
                    options={newsOptions} 
                    setNewOption={sortBy} 
                />

                <div className="catalog__clear-filter">
                    <FontAwesomeIcon icon={faSliders} />
                    
                    <p onClick={clearFilters}>Стерти фільтри</p>
                </div>
            </div>

            <div className="catalog__content">
                <div className="catalog__left-filter">
                    <div className="catalog__body">
                        <ul className="catalog__menu-list">
                            {filterBlock.map((fil, ind) => {
                                return (
                                    <li className="catalog__menu-item" key={fil.category + ind}>
                                        <FilterComponent
                                            title={fil.category}
                                            options={fil.filters.map(i => i.title)}
                                            checked={checked}
                                            checkItem={editFilters}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="catalog__content-items">
                    {cards.map((card, index) => {
                        return (<div className="catalog__item" key={'card' + index}>
                            <Card {...card} />
                        </div>);
                    })}
                </div>
            </div>

            <div className="catalog__btn-wrapper">
                <p className="catalog__page-count">Зараз на сторінці {cards.length} з {count} товарів</p>

                <button className="catalog__btn" onClick={() => showMore()}>Показати більше</button>
            </div>
        </section>

        {filterModal && <section className="catalog__modal">
            <div className="catalog__header">
                <p className="catalog__title">Фільтри</p>

                <FontAwesomeIcon style={{
                    width: '16px',
                    height: '16px'
                }} icon={faXmark} onClick={() => setFitlerModal(false)}/>
            </div>

            <div className="catalog__body">
                <ul className="catalog__menu-list">
                    {filterBlock.map((fil, ind) => {
                        return (
                            <li className="catalog__menu-item" key={fil.category + ind}>
                                <FilterComponent
                                    title={fil.category}
                                    options={fil.filters.map(i => i.title)}
                                    checked={checked}
                                    checkItem={editFilters}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="catalog__btns">
                <button className="catalog__btn" onClick={() => setFitlerModal(false)}>
                    Застосувати фільтри
                </button>

                <button className="catalog__btn catalog__btn--white" onClick={() => setFitlerModal(false)}>
                    Відмінити фільтри
                </button>
            </div>
        </section>}
    </main>);
}