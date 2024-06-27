// Sidebar.js
import React, { useRef, useEffect } from 'react';

function Sidebar({ onFileUpload, uploadedImageFiles, onDeleteImage }) {
    const fileInputRef = useRef(null);
    const dropzoneRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        onFileUpload(files);
        event.target.value = null;
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer.files);
        onFileUpload(files);
    };

    useEffect(() => {
        const dropzone = dropzoneRef.current;
        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('drop', handleDrop);

        return () => {
            dropzone.removeEventListener('dragover', handleDragOver);
            dropzone.removeEventListener('drop', handleDrop);
            uploadedImageFiles.forEach(file => URL.revokeObjectURL(file.url));
        };
    }, [uploadedImageFiles, onFileUpload]);

    return (
        <div ref={dropzoneRef} className="col-3 bg-light left-panel p-3 d-flex flex-column">
            <h1 className="text-center mb-4">Sider Bar</h1>
            <div className="nav flex-column mb-4">
                <button className="btn btn-primary mb-2" onClick={handleUploadClick}>Uplaod Image</button>
                <button className="btn btn-secondary mb-2">Get Result</button>
                <button className="btn btn-secondary mb-2">Setting</button>
            </div>

            <h2 className="mb-3">File Upload</h2>
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