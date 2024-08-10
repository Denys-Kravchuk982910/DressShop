import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import './cropperModal.scss';

export interface CropperType {
    url: string;
    onCrop: () => void;
    cropperRef: React.RefObject<ReactCropperElement>;
}

const CropperModal: React.FC<CropperType> = ({ url, onCrop, cropperRef }) => {

    return (<div className="croppModal">
        <Cropper
            src={url}
            style={{ maxHeight: "600px", width: "100%" }}
            aspectRatio={150 / 200}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
        />
    </div>);
}

export default CropperModal;