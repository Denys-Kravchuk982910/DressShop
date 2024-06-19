import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.scss';
import Footer from './components/Footer';
import Menu from './components/Menu';


const App = () => {
  return (<>
    <Navbar />

    <Menu />

    <Outlet />

    <Footer />
  </>);
}

export default App;
