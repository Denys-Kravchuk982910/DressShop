import { useEffect, useRef, useState } from "react";
import SlideSwitcher from "../custom/SlideSwitcher";
import './styles/carousel.scss';

export const Carousel = () => {
    const [activeSlidePoint, setActiveSlidePoint] = useState(0);
    const intervalRef = useRef(0);

    const styles = {
        left: `calc(-${activeSlidePoint} * 100%)`
    };

    useEffect(() => {
        resign();
    }, []);

    const resign = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(() => {
            setActiveSlidePoint(prev => {
                if (prev === 2) {
                    return 0;
                } 

                return prev + 1;
            });
        }, 3000);
    }

    return (<>
        <div className="carousel">
                <div className="carousel__carousel-slide" style={styles}>
                    <img className="carousel__carousel-img" src="images/slider1.jpg" />
                </div>

                <div className="carousel__carousel-slide" style={styles}>
                    <img className="carousel__carousel-img" src='images/slider2.jpg' />
                </div>

                <div className="carousel__carousel-slide" style={styles}>
                    <img className="carousel__carousel-img" src='images/slider3.jpg' />
                </div>
            </div>

            <SlideSwitcher 
                count={3} 
                activeSlidePoint={activeSlidePoint} 
                setActiveSlidePoint={setActiveSlidePoint}
                resignInterval={() => resign()}
            />
    </>);
}