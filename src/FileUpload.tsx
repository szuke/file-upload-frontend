// @ts-ignore
import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('uploadForm') as HTMLFormElement;
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
        }).then(response => {
            console.log(response);
            if (response.ok) {
                setMessage('File uploaded successfully!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                setMessage('File upload failed.');
            }
        }).catch(error => {
            setMessage('File upload failed.');
        });
    };

    const handleUpload = (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        // Simulate a file upload process
        setTimeout(() => {
            setMessage(`File "${file.name}" uploaded successfully!`);
            setFile(null);
        }, 1000);
    };

    return (
        <div>
            <h2>Upload a File</h2>

            <form id="uploadForm" action="http://127.0.0.1:8080/upload" method="post" encType="multipart/form-data"
                  onSubmit={handleFormSubmit}>
                <label htmlFor="file">Choose a file:</label>
                <input type="file" id="file" name="file" required/>
                <br/><br/>
                <button type="submit">Upload</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
