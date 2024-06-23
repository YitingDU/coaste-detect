import React from 'react';

function MainWorkArea({ uploadedImageFiles }) {
    return (
        <div className="col-9 bg-light right-panel p-3 d-flex flex-column">
            <h1 className="text-center mb-4">主要工作区</h1>
            <div className="image-display border p-3 mb-4 flex-grow-1">
                {uploadedImageFiles.length > 0 ? (
                    uploadedImageFiles.map((image, index) => (
                        <img key={index} src={image.url} alt={image.file.name} className="img-fluid mb-3" />
                    ))
                ) : (
                    <div className="placeholder d-flex justify-content-center align-items-center flex-grow-1">
                        <p>没有上传的图片,请上传图片以显示。</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainWorkArea;