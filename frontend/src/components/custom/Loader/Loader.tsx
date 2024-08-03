import './styles/loader.scss';

export interface LoaderType {
    width?: number;
}

const Loader : React.FC<LoaderType> = ({ width = 60 }) => {
    return (
        <div className="loader" id='loader'>
            <div className="loader__loader-icon" style={{
                width: `${width}px`,
            }}></div>
        </div>
    );
}

export default Loader;