import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

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

export default function ArticleFilesUpload() {
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
        <Container>
            <h1>記事用ファイルアップロード</h1>
            <Box component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 4,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}
            >
                <input
                    accept=".md"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                    <Button variant="contained" component="span">
                    ファイルを選択
                    </Button>
                </label>
                {selectedFiles.length > 0 && (
                    <p>以下のファイルが選択されています</p>
                )}
                {selectedFiles.slice(0, 5).map((file, index) => (
                    <p key={index}>{file.name}</p>
                ))}
                {selectedFiles.length > 5 && (
                    <p>他{selectedFiles.length - 5}件のファイルが選択されています</p>
                )}
                
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={selectedFiles.length === 0}>Upload</Button>
                {response && (
                    <p>{response.message}</p>
                )}
                {error && <p>{error}</p>}
            </Box>
        </Container>
    );
};