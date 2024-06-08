import React, { useState } from 'react';

const fetchUpload = async (files: File[]) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('files', file);
    });

    const response = await fetch(`${apiUrl}/api/articles/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('アップロードに失敗しました');
    }
    return await response.json();
}

export default function Uploader() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // ファイルが選択されたときの処理
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileList = Array.from(files);
            setSelectedFiles(fileList);
        }
    };

    // ファイルのアップロード処理
    const handleUpload = () => {
        fetchUpload(selectedFiles)
            .then(() => {
                alert('アップロードが完了しました');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};