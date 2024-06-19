import { useState } from 'react';
import SlideSwitcher from '../SlideSwitcher';
import './styles/style.scss';

export interface BlockHeaderType {
    title: string;
    count: number;
    slide: number;
    setSlide: React.Dispatch<React.SetStateAction<number>>;
}

export const BlockHeader: React.FC<BlockHeaderType> = ({ title, slide, setSlide, count }) => {
    return (<div className="blHeader">
        <h3 className="blHeader__title">{title}</h3>
        
        <div className="blHeader__line-wrapper">
            <div className="blHeader__line"></div>
        </div>

        <div className="blHeader__switcher">
            <SlideSwitcher count={count} activeSlidePoint={slide} setActiveSlidePoint={setSlide} />
        </div>
    </div>);
}