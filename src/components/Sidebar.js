import React, { useRef, useEffect } from 'react';

function Sidebar({ onFileUpload, uploadedImageFiles, onDeleteImage }) {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        onFileUpload(files);
        event.target.value = null;
    };

    useEffect(() => {
        return () => {
            uploadedImageFiles.forEach(file => URL.revokeObjectURL(file.url));
        };
    }, [uploadedImageFiles]);

    return (
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
                onChange={handleFileChange}
                accept="image/*"
            />
            <ul className="list-group mb-4 flex-grow-1">
                {uploadedImageFiles.map((image, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {image.file.name}
                        <button className="btn btn-danger btn-sm" onClick={() => onDeleteImage(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
