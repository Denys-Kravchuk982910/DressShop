import { useEffect, useMemo, useState } from "react";
import { SlideAction, SlideType } from "../../MainPage/types";
import { Transition } from "../../MainPage/MainPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export interface SlideSwitcherType {
    count: number;
    activeSlidePoint: number;
    setActiveSlidePoint: React.Dispatch<React.SetStateAction<number>>;
    resignInterval?: () => void;
}

export const SlideSwitcher : React.FC<SlideSwitcherType> = ({ count, activeSlidePoint, setActiveSlidePoint, resignInterval }) => {
    const [transition, setTransition] = useState<Transition>({ leftPixels: 57 });

    useEffect(() => {
        setTransition({leftPixels: activeSlidePoint * size + 57});
    }, [activeSlidePoint]);

    const activeSlide = activeSlidePoint + 1;

    const slides : number[] = [];
    const size = 19;

    for (let i = 0; i < count; i++) {
        slides.push(i + 1);
    }

    const slide = (action: SlideAction) => {
        if (resignInterval) {
            resignInterval();
        }

        switch (action.type) {
            case SlideType.FORWARD: {
                if (slides[slides.length - 1] === activeSlide) {
                    setActiveSlidePoint(0);

                    return;
                } 
                
                setActiveSlidePoint(prev => prev + 1);

                break;
            }

            case SlideType.BACK: {
                if (slides[0] === activeSlide) {
                    setActiveSlidePoint(slides[slides.length - 1]);

                    return;
                }

                setActiveSlidePoint(prev => prev - 1);

                break;
            }

            case SlideType.PAGE: {
                const page = action.payload;

                setActiveSlidePoint(page);
            }
        }
    }

    const styleSlider = useMemo(() => {
        return {
            transform: `translateX(calc(-${transition.leftPixels}px))`
        };
    }, [transition]);
    
    return (<div className="main__carousel-switcher">
        <div className="main__arrow main__arrow--left">
            <FontAwesomeIcon 
                icon={faChevronLeft} 
                onClick={() => slide({ type: SlideType.BACK })} 
            />
        </div>

        <div className="main__points-container">
        <div className="main__points" style={styleSlider}>
            {slides.map(number => {
                return (
                <div 
                    className='main__point'
                    key={'point' + number}
                    onClick={() => slide({ type: SlideType.PAGE, payload: number - 1 })}
                >
                    {activeSlide === number && <span className="main__point-number">{number}</span>}
                    {activeSlide !== number && (
                        <div className={classNames("main__point-square", 
                            { "main__point-square--lower" : Math.abs(number - activeSlide) === 2 },
                            { "main__point-square--hide" : Math.abs(number - activeSlide) >= 3 }
                        )}
                        >
                        </div>
                    )}
                </div>);
            })}
        </div>
        </div>

        <div className="main__arrow main__arrow--right">
            <FontAwesomeIcon 
                icon={faChevronRight} 
                onClick={() => slide({ type: SlideType.FORWARD })}  
            />
        </div>
    </div>);
}