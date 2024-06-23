import React, { useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setUploadedImages(imageFiles);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="App container-fluid d-flex flex-column">
            <div className="row flex-grow-1">
                <div className="col-3 bg-light left-panel p-3 d-flex flex-column">
                    <h1 className="text-center mb-4">导航菜单</h1>
                    <div className="nav flex-column mb-4">
                        <button className="btn btn-primary mb-2" onClick={handleUploadClick}>上传图像</button>
                        <button className="btn btn-secondary mb-2">查看结果</button>
                        <button className="btn btn-secondary mb-2">设置</button>
                    </div>

                    <h2 className="mb-3">文件上传</h2>
                    <input
                        type="file"
                        multiple
                        className="form-control mb-3 d-none"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <ul className="list-group mb-4 flex-grow-1">
                        {uploadedImages.map((image, index) => (
                            <li key={index} className="list-group-item">{image.file.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-9 bg-light right-panel p-3 d-flex flex-column">
                    <h1 className="text-center mb-4">主要工作区</h1>
                    <div className="image-display border p-3 mb-4 flex-grow-1">
                        {uploadedImages.length > 0 ? (
                            uploadedImages.map((image, index) => (
                                <img key={index} src={image.url} alt={image.file.name} className="img-fluid mb-3" />
                            ))
                        ) : (
                            <div className="placeholder d-flex justify-content-center align-items-center flex-grow-1">
                                <p>没有上传的图片，请上传图片以显示。</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
