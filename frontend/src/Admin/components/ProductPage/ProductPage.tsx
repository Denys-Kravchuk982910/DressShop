import { useNavigate, useParams } from 'react-router-dom';
import './product.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { FilterBlock, ProductType } from '../../../contexts/ProductContextProvider';
import { addFilterToProduct, addImage, createProduct, getAllFilters, getAllFiltersById, getProductById, getSizes, removeFilterFromProduct, removeFilterFromServer, removeImageServer, removeSize, setSize, updateProduct } from '../../http/AdminHttpClient';
import { TokenContext } from '../../../contexts/TokenContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '../FiltersPage/FiltersPage';
import { serverLink } from '../../../data/httpClient';
import { ReactCropperElement } from 'react-cropper';
import CropperModal from '../custom/CropperModal/CropperModal';
import { AddProduct, EditProduct, Product } from '../../http/types/LoginTypes';

export interface ProductTypeExtended extends ProductType {
    filters: FilterBlock[];
}

const emptyObject = {
    id: 0,
    title: '',
    description: '',
    rating: 0,
    shortDesc: '',
    price: 0,
    feedbacks: [],
    sizes: [],
    filters: [],
    images: [],
};

export const ProductPage = () => {
    const { token } = useContext(TokenContext);
    const { productId } = useParams();
    const fileInput = useRef<HTMLInputElement>(null);

    const [product, setProduct] = useState<ProductTypeExtended>(emptyObject);

    const [addSize, setAddSize] = useState(false);
    const [filterAdd, setFilterAdd] = useState<{ [key: string]: { isOpen: boolean, value: string } }>({});
    const [sizes, setSizes] = useState<Filter[]>([]);
    const [filterBlocks, setFilterBlocks] = useState<FilterBlock[]>([]);
    const [choosenSize, setChoosenSize] = useState('*');
    const [croppImage, setCroppImage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!croppImage) {
            document.body.style.overflow = 'auto';
        }
    }, [croppImage]);

    useEffect(() => {
        if (productId) {
            getProductById(token, parseInt(productId))
                .then(item => {
                    getAllFiltersById(token, parseInt(productId))
                        .then(resp => {
                            setProduct({
                                ...item,
                                filters: resp,
                            });
                        });
            });
        } else {
            setProduct(emptyObject);
        }

        getAllFilters(token)
            .then(resp => {
                const obj: {[key: string]: { isOpen: boolean, value: string}} = {};

                for (const key in resp) {
                    obj[resp[key].category] = { isOpen: false, value: '*' };
                }

                setFilterAdd(obj);

                setFilterBlocks(resp);
            });

        getSizes(token)
            .then(setSizes);
    }, [productId]);

    const removeSizes = (size: string) => {
        setProduct(prev => {
            if (!prev)
                return prev;

            return ({
                ...prev,
                sizes: prev.sizes.filter(x => x !== size)
            })
        });

        if (sizes && productId) {
            const sizeItem = sizes.filter(x => x.title === size)[0];

            removeSize(token, parseInt(productId), sizeItem.id);
        }
    }

    const selectValue = (value: string) => {
        setChoosenSize(value);

        if (value === '*') {
            setAddSize(false);
            return;
        }

        const f = JSON.parse(value) as Filter;

        setAddSize(false);
        setProduct(prev => {
            if (!prev)
                return prev;
            
            return ({
                ...prev,
                sizes: [...prev.sizes, f.title],
            })
        });

        if (productId) {
            setSize(token, parseInt(productId), f.id);
        }
    }

    const getProductFilters = (filBlocks: FilterBlock[], category: string, f: Omit<Filter, "status">) => {
        const cats = filBlocks.filter(x => x.category === category)[0];

        const filts = cats ? [...cats.filters] : [];

        filts.push(f);

        const fBlock: FilterBlock = {
            category,
            filters: filts,
        };

        return [...filBlocks.filter(x => x.category !== category), fBlock];
    }

    const removeProductFilters = (filBlocks: FilterBlock[],
            category: string, title: string, f: Omit<Filter, "status">) => {
        const temp = [...filBlocks.filter(x => x.category === category)];

        const filts = (temp[0] ? temp[0].filters : [] as Filter[])
            .filter(x => x.title !== title);

        const fBlock: FilterBlock = {
            category,
            filters: filts,
        };

        return [...filBlocks.filter(x => x.category !== category), fBlock];
    }

    const selectValueFilter = (value: string, category: string) => {
        if (value === '*') {
            setFilterAdd(prev => ({
                ...prev,
                [category]: { ...prev[category], isOpen: false }
            }));
            return;
        }
        
        setFilterAdd(prev => ({
            ...prev,
            [category]: { ...prev[category], value: value }
        }));

        const f = JSON.parse(value) as Filter;

        setProduct(prev => {
            if (!prev)
                return prev;
            
            return ({
                ...prev,
                filters: getProductFilters(prev.filters, f.category, f),
            })
        });

        setFilterAdd(prev => ({
            ...prev,
            [f.category]: { ...prev[f.category], isOpen: false }
        }));

        if (productId) {
            addFilterToProduct(token, parseInt(productId), f.id);
        }
    }

    const removeImage = (image: string) => {
        setProduct(prev => {
            if (!prev)
                return prev;

            return ({
                ...prev,
                images: prev.images.filter(x => x !== image)
            })
        });

        if (productId) {
            removeImageServer(token, image);
        }
    }

    const downloadImage = () => {
        if (fileInput.current) {
            let input = fileInput.current;

            const img = input.files ? input.files[0] : null;

            if (img) {
                const url = URL.createObjectURL(img);

                setCroppImage(url);
                window.scrollTo(0, 0);
                document.body.style.overflow = 'hidden';
            }

            fileInput.current.value = '';
        }
    }

    const removeFilters = (filter: Omit<Filter, "status">, productId: number, filterId: number) => {
        setProduct(prev => {
            if (!prev || !product)
                return prev;

            return {
                ...prev,
                filters: removeProductFilters(product.filters, 
                    filter.category, filter.title , filter)
            };
        });
        
        if (productId) {
            removeFilterFromProduct(token, productId, filterId);
        }
    }

    const cropperRef = useRef<ReactCropperElement>(null);
    
    const onCrop = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper;

            const base64 = cropper.getCroppedCanvas().toDataURL();

            if (productId) {
                addImage(token, parseInt(productId), base64)
                .then(resp => {
                    setProduct(prev => {
                        if (!prev)
                            return prev;

                        return {
                            ...prev,
                            images: [...prev.images, resp.fileName]
                        }
                    });
                });
            } else {
                setProduct(prev => {
                    if (!prev)
                        return prev;
    
                    return {
                        ...prev,
                        images: [...prev.images, base64]
                    }
                });
            }

            setCroppImage('');
        }
    };

    const closeCategory = (filterBlock: FilterBlock) => {
        setFilterAdd(prev => ({
            ...prev,
            [filterBlock.category]: { ...prev[filterBlock.category], isOpen: false }}));
    }

    const openCategory = (filterBlock: FilterBlock) => {
            setFilterAdd(prev => ({
            ...prev,
            [filterBlock.category]: { ...prev[filterBlock.category], isOpen: true }
        }))
    }

    const addProductInners = (resp: Product) => {
        setProduct(prev => ({
            ...prev,
            images: []
        }))

        product.sizes.forEach(size => {
            setSize(token, resp.id, sizes.filter(x => x.title === size)[0].id);
        });

        product.filters.forEach(filterObj => {
            filterObj.filters.forEach(filter => {
                addFilterToProduct(token, resp.id, filter.id);
            });
        });

        product.images.forEach(image => {
            addImage(token, resp.id, image)
                .then(resp => {
                    setProduct(prev => ({
                        ...prev,
                        images: [...prev.images, resp.fileName]
                    }));
                });
        })

        setProduct(prev => ({
            ...prev,
            ...resp
        }));

        navigate('/admin/product/' + resp.id);
    }

    const onChangeProduct = () => {
        if (product.id !== 0) {
            const editProduct: EditProduct = {
                id: product.id,
                tag: product.shortDesc,
                description: product.description,
                price: product.price,
                title: product.title,
            };
    
            updateProduct(token, editProduct)
                .then(() => {
                    alert('Дані змінено!');
                })
        } else {
            if (product.shortDesc
                && product.description
                && product.title
                && product.price > 0) {
                    const addProduct: AddProduct = { ...product, tag: product.shortDesc };

                    createProduct(token, addProduct)
                        .then(addProductInners);
            } else {
                alert('Введіть усі дані!');
            }
        }
    }

    return (<div className='adminProduct'>
        {product &&
        <div className='adminProduct__form'>
            <div className="adminProduct__form-group">
                <label 
                    htmlFor="title" 
                    className='adminProduct__form-label'
                >
                    Назва
                </label>

                <input
                    id='title'
                    name='title'
                    className='adminProduct__form-input'
                    value={product.title}
                    onChange={e => {
                        setProduct(prev => {
                            if (prev) {
                                return ({
                                    ...prev,
                                    title: e.target.value
                                });
                            } else {
                                return prev;
                            }
                        });
                    }}
                />
            </div>

            <div className="adminProduct__form-group">
                <label 
                    htmlFor="tag" 
                    className='adminProduct__form-label'
                >
                    Тег
                </label>

                <input
                    id='tag'
                    name='tag'
                    className='adminProduct__form-input'
                    value={product.shortDesc}
                    onChange={e => {
                        setProduct(prev => {
                            if (prev) {
                                return ({
                                    ...prev,
                                    shortDesc: e.target.value
                                });
                            } else {
                                return prev;
                            }
                        });
                    }}
                />
            </div>

            <div className="adminProduct__form-group">
                <label 
                    htmlFor="price" 
                    className='adminProduct__form-label'
                >
                    Ціна
                </label>

                <input
                    id='price'
                    name='price'
                    className='adminProduct__form-input'
                    value={product.price || ''}
                    onChange={e => {
                        setProduct(prev => {
                            if (prev) {
                                return ({
                                    ...prev,
                                    price: parseInt(e.target.value) || 0
                                });
                            } else {
                                return prev;
                            }
                        });
                    }}
                />
            </div>

            <div className="adminProduct__form-group">
                <label 
                    htmlFor="description" 
                    className='adminProduct__form-label'
                >
                    Опис
                </label>

                <textarea
                    id='description'
                    name='description'
                    className='adminProduct__form-area'
                    value={product.description}
                    onChange={e => {
                        setProduct(prev => {
                            if (prev) {
                                return ({
                                    ...prev,
                                    description: e.target.value
                                });
                            } else {
                                return prev;
                            }
                        });
                    }}
                    style={{resize: 'none'}}
                />
            </div>

            <div className="adminProduct__form-group">
                <h3>Розміри:</h3>
                
                <div className="adminProduct__form-sizes">
                    {product.sizes.map(size => {
                        return (<div className='adminProduct__form-size' key={'size' + size}>
                            <div className="adminProduct__form-close" onClick={() => removeSizes(size)}>
                                <FontAwesomeIcon icon={faClose} width={15} height={15} />
                            </div>

                            {size}
                        </div>);
                    })}

                    <div
                        className='adminProduct__form-plus'
                        onClick={() => {
                            if (!addSize){
                                setChoosenSize('*');
                                setAddSize(true);
                            }
                        }} 
                    >
                        {addSize && <div className="adminProduct__form-close">
                            <FontAwesomeIcon icon={faClose} width={15} height={15} onClick={
                                () => setAddSize(false)
                            } />
                        </div>}

                        {!addSize && <FontAwesomeIcon
                            icon={faPlus}
                            width={15}
                            height={15}
                        />}

                        {addSize && (<select value={choosenSize} onChange={e => selectValue(e.currentTarget.value)}>
                            <option value="*" onClick={() => setAddSize(false)}>
                                Виберіть значення
                            </option>
                            {sizes.filter(x => !product.sizes.includes(x.title)).map(size => {
                                return (<option value={JSON.stringify(size)} key={size.id + size.title}>{size.title}</option>)
                            })}
                        </select>)}
                    </div>
                </div>
            </div>

            <div className="adminProduct__form-group">
                <h3>Фотографії:</h3>

                <div className="adminProduct__form-images">
                    {product.images.map(image => {
                        return (<div className='adminProduct__form-image' key={'img' + image}>
                            <div
                                className="adminProduct__form-close adminProduct__form-close--image"
                                onClick={() => removeImage(image)}
                            >
                                <FontAwesomeIcon
                                    icon={faClose}
                                    width={15}
                                    height={15}
                                />
                            </div>

                            <img
                                src={product.id !== 0 ? serverLink + 'images/' + image : image}
                                alt="img"
                                className="adminProduct__form-src"
                            />
                        </div>)
                    })}

                    <div className='adminProduct__form-image adminProduct__form-image--add'>
                        <img
                            src={serverLink + 'images/' + 'add-image.png'}
                            alt="img"
                            className="adminProduct__form-src"
                            onClick={() => {
                                if (fileInput.current) {
                                    fileInput.current.click();
                                }
                            }}
                        />

                        <input
                            type="file"
                            className='adminProduct__form-input-img'
                            ref={fileInput}
                            accept=".jpg, .jpeg, .png" 
                            onChange={downloadImage}
                        />
                    </div>
                </div>
            </div>

            <div className="adminProduct__form-group">
                {filterBlocks.map(filterBlock => {
                    const isActive = filterAdd[filterBlock.category].isOpen;
                    const filters = filterBlock.filters;
                    const filtersArray = product.filters
                        .filter(x => x.category === filterBlock.category);
                    const userFilters = filtersArray[0] ? filtersArray[0].filters : [];

                    return (<div key={filterBlock.category + 'cat'}>
                        <h3>{filterBlock.category}:</h3>

                        <div className="adminProduct__form-sizes">
                            {userFilters.map(filter => {
                                return (<div className='adminProduct__form-size' key={'filter' + filter.id}>
                                    <div className="adminProduct__form-close" 
                                        onClick={() => removeFilters(filter, product.id, filter.id)}>
                                        <FontAwesomeIcon icon={faClose} width={15} height={15} />
                                    </div>

                                    {filter.title}
                                </div>);
                            })}

                            <div
                                className='adminProduct__form-plus'
                                onClick={() => !isActive && openCategory(filterBlock)}
                            >
                                {isActive && <div className="adminProduct__form-close"
                                    onClick={() => closeCategory(filterBlock)}
                                >
                                    <FontAwesomeIcon
                                        icon={faClose}
                                        width={15}
                                        height={15}
                                    />
                                </div>}

                                {!isActive && <FontAwesomeIcon
                                    icon={faPlus}
                                    width={15}
                                    height={15}
                                />}

                                {isActive && (<select
                                    value={filterAdd[filterBlock.category].value}
                                    onChange={e => selectValueFilter(e.currentTarget.value, filterBlock.category)}
                                >
                                    <option value="*" onClick={() => setFilterAdd(prev => ({
                                            ...prev,
                                            [filterBlock.category]: { ...prev[filterBlock.category], isOpen: false }
                                        }))}>
                                        Виберіть значення
                                    </option>
                                    {filters
                                        .filter(x => !(userFilters.filter(y => y.title === x.title).length !== 0))
                                        .map(filter => {
                                        return (<option
                                            value={JSON.stringify(filter)}
                                            key={filter.id + filter.title}
                                        >
                                            {filter.title}
                                        </option>)
                                    })}
                                </select>)}
                            </div> 
                        </div>   
                    </div>);
                })}
            </div>

            <div className='adminProduct__form-submit'>
                <button
                    className='adminProduct__form-submit-btn'
                    onClick={onChangeProduct}
                >
                    {product.id !== 0 ? 'Змінити' : 'Створити'}
                </button>
            </div>
        </div>}

        {croppImage 
        && <div className='adminProduct__cropp-dialog' id='cropp-dialog'>
            <CropperModal
                url={croppImage}
                cropperRef={cropperRef}
                onCrop={() => {}}
            />

            <div className='adminProduct__cropp-buttons'>
                <button onClick={onCrop}>Зберегти</button>
                <button onClick={() => setCroppImage('')}>Відмінити</button>
            </div>
        </div>}
    </div>);
}