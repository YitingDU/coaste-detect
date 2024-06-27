// ImageEditor.js
import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import './ImageEditor.css';

function ImageEditor({ image, onSave, onCancel }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef(null);

    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImage(image.url, croppedAreaPixels, rotation);
        onSave(croppedImage);
    };

    const getCroppedImage = (url, crop, rotation) => {
        const canvas = canvasRef.current;
        const img = new Image();
        img.src = url;

        return new Promise((resolve) => {
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                const maxSize = Math.max(img.width, img.height);
                const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

                canvas.width = safeArea;
                canvas.height = safeArea;

                ctx.translate(safeArea / 2, safeArea / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-safeArea / 2, -safeArea / 2);

                ctx.drawImage(img, safeArea / 2 - img.width * 0.5, safeArea / 2 - img.height * 0.5);
                const data = ctx.getImageData(0, 0, safeArea, safeArea);

                canvas.width = crop.width;
                canvas.height = crop.height;

                ctx.putImageData(data, Math.round(0 - safeArea / 2 + crop.x), Math.round(0 - safeArea / 2 + crop.y));

                resolve(canvas.toDataURL());
            };
        });
    };

    return (
        <div className="image-editor">
            <div className="cropper-container">
                <Cropper
                    image={image.url}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className="controls">
                <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)} />
                <input type="range" min={0} max={360} value={rotation} onChange={(e) => setRotation(e.target.value)} />
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onCropComplete}>Save</button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}

export default ImageEditor;