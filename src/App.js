import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import MainWorkArea from './components/MainWorkArea';

function App() {
    const [uploadedImageFiles, setUploadedImageFiles] = useState([]);

    const handleFileUpload = (files) => {
        const imageFiles = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setUploadedImageFiles(prevFiles => [...prevFiles, ...imageFiles]);
    };

    const handleDeleteImage = (index) => {
        setUploadedImageFiles(prevFiles => {
            const file = prevFiles[index];
            URL.revokeObjectURL(file.url);  // 释放图片的URL
            return prevFiles.filter((_, i) => i !== index);
        });
    };

    const handleClearImages = () => {
        setUploadedImageFiles([]);
    };

    return (
        <div className="App container-fluid d-flex flex-column">
            <div className="row flex-grow-1">
                <Sidebar onFileUpload={handleFileUpload} uploadedImageFiles={uploadedImageFiles} onDeleteImage={handleDeleteImage} onClearImages={handleClearImages} />
                <MainWorkArea uploadedImageFiles={uploadedImageFiles} />
            </div>
        </div>
    );
}

export default App;