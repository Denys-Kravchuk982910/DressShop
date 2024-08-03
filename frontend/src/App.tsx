import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.scss';
import Footer from './components/Footer';
import Menu from './components/Menu';
import { useContext, useEffect } from 'react';
import { getProducts } from './data/httpClient';
import { ProductContext } from './contexts/ProductContextProvider';
import Loader from './components/custom/Loader/Loader';
import { LoaderContext } from './contexts/LoaderContextProvider';


const App = () => {
  const { setCards } = useContext(ProductContext);

  const { isLoad } = useContext(LoaderContext);

  useEffect(() => {
    getProducts().then(response => {
      setCards(response);
    });
  }, []);

  return (<>
    {isLoad && <Loader />}

    <Navbar />

    <Menu />

    <Outlet />

    <Footer />
  </>);
}

export default App;
