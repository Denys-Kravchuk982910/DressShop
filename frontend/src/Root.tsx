import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import MainPage from './components/MainPage';
import { MenuContextProvider } from './contexts/MenuContextProvider';
import CatalogPage from './components/CatalogPage';

export const Root = () => {
    return (
    <MenuContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<MainPage />}/>

            <Route path='/catalog' element={<CatalogPage />} />
          </Route>
        </Routes>
      </Router>
    </MenuContextProvider>)
}