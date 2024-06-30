import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import MainPage from './components/MainPage';
import { MenuContextProvider } from './contexts/MenuContextProvider';
import CatalogPage from './components/CatalogPage';
import CardPage from './components/CardPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const Root = () => {
    return (
    <MenuContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<MainPage />}/>

            <Route path='catalog' element={<CatalogPage />} />

            <Route path='card'>
              <Route index element={<Navigate to='/' replace/>}/>
              <Route path=':cardId' element={<CardPage />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </MenuContextProvider>)
}