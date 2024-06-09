import React, { useState } from 'react';
import Button from '@mui/material/Button';

type UploadResponse = {
    message: string;
    count: number;
    filenames: string[];
};

// 複数ファイルのアップロード処理
async function fetchUpload(files: File[]) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('files[]', file);
    });

    const response = await fetch(`${apiUrl}/api/articles/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('アップロードに失敗しました');
    }
    return await response.json() as UploadResponse;
}

export default function Uploader() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [response, setResponse] = useState<UploadResponse | null>(null);
    const [error, setError] = useState<string>('');

    // ファイルが選択されたときの処理
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
        }
    };

    // ファイルのアップロード処理
    const handleUpload = () => {
        // ファイルが選択されていない場合は処理を中断
        if (selectedFiles.length === 0) {
            return;
        }
        fetchUpload(selectedFiles)
            .then((response) => {
                setResponse(response);
                setSelectedFiles([]);
            })
            .catch((error) => {
                setError(error.message);
            });
        };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload} disabled={selectedFiles.length === 0}>Upload</Button>
            {response && (
                <div>
                    <p>{response.message}</p>
                    <p>アップロードファイル数: {response.count}</p>
                    <ul>
                        {response.filenames.map((filename) => (
                            <li key={filename}>{filename}</li>
                        ))}
                    </ul>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};