// MainWorkArea.js
import React from 'react';

function MainWorkArea({ uploadedImageFiles }) {
    return (
        <div className="col-9 bg-light right-panel p-3 d-flex flex-column">
            <h1 className="text-center mb-4">Main working part</h1>
            <div className="image-display border p-3 mb-4 flex-grow-1">
                {uploadedImageFiles.length > 0 ? (
                    <div className="row">
                        {uploadedImageFiles.map((image, index) => (
                            <div key={index} className="col-3 mb-3">
                                <div className="card">
                                    <img src={image.url} alt={image.file.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{image.file.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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