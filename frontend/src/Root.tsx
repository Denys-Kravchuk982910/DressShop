import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import MainPage from './components/MainPage';
import { MenuContextProvider } from './contexts/MenuContextProvider';
import CatalogPage from './components/CatalogPage';
import CardPage from './components/CardPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import FavouritesPage from './components/FavouritesPage';
import CartPage from './components/CartPage';
import { ProductContextProvider } from './contexts/ProductContextProvider';
import { ViewedProductContextProvider } from './contexts/ViewedProductContextProvider';
import { CartContextProvider } from './contexts/CartContextProvider';
import { LikedContextProvider } from './contexts/LikedContextProvider';
import { LoaderContextProvider } from './contexts/LoaderContextProvider';
import AdminApp from './Admin/AdminApp';
import Login from './Admin/components/Login/Login';
import AdminMainPage from './Admin/components/MainPage/MainPage';
import { TokenContextProvider } from './contexts/TokenContextProvider';
import OrderPage from './Admin/components/OrderPage/OrderPage';
import ProductsPage from './Admin/components/ProductsPage/ProductsPage';
import FiltersPage from './Admin/components/FiltersPage/FiltersPage';
import Main from './Admin/components/Main/Main';
import { ProductPage } from './Admin/components/ProductPage/ProductPage';

export const Root = () => {
    return (
      <TokenContextProvider>
        <LoaderContextProvider>
        <LikedContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <ViewedProductContextProvider>
              <MenuContextProvider>
                <Router>
                  <Routes>
                    <Route path='/admin' element={<AdminApp />}>
                      <Route path='login' element={<Login />} />
                      
                      <Route element={<AdminMainPage />}>
                        <Route path='orders' element={<OrderPage />} />
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='filters' element={<FiltersPage />} />
                        <Route path='product'>
                          <Route path=':productId?' element={<ProductPage />}/>
                        </Route>
                        <Route index element={<Main />} />
                      </Route>
                    </Route>

                    <Route path='/' element={<App />}>
                      <Route index element={<MainPage />}/>

                      <Route path='catalog' element={<CatalogPage />} />

                      <Route path='card'>
                        <Route index element={<Navigate to='/' replace/>}/>
                        <Route path=':cardId' element={<CardPage />} />
                      </Route>

                      <Route path='favourites' element={<FavouritesPage />} />
                      <Route path='cart' element={<CartPage />} />
                    </Route>

                    <Route path='*' element={<NotFoundPage />} />
                  </Routes>
                </Router>
              </MenuContextProvider>
            </ViewedProductContextProvider>
          </ProductContextProvider>
        </CartContextProvider>
      </LikedContextProvider>
      </LoaderContextProvider>
      </TokenContextProvider>
      )
}