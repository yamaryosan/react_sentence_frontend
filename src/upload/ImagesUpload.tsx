import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

type UploadResponse = {
    message: string;
    count: number;
};

// 複数ファイルのアップロード処理
async function fetchUpload(files: File[]) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('images[]', file);
    });

    const response = await fetch(`${apiUrl}/api/articleImages/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('アップロードに失敗しました');
    }
    return await response.json() as UploadResponse;
}

export default function ImagesUpload() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [response, setResponse] = useState<UploadResponse | null>(null);
    const [error, setError] = useState<string>('');

    // ファイルが選択されたときの処理
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedImages(Array.from(files));
        }
    };

    // ファイルのアップロード処理
    const handleUpload = () => {
        // ファイルが選択されていない場合は処理を中断
        if (selectedImages.length === 0) {
            return;
        }
        fetchUpload(selectedImages)
            .then((response) => {
                setResponse(response);
                setSelectedImages([]);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Container>
            <h1>画像ファイルアップロード</h1>
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
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                    ファイルを選択
                    </Button>
                </label>
                {selectedImages.length > 0 && (
                    <p>以下のファイルが選択されています</p>
                )}
                {selectedImages.slice(0, 5).map((file, index) => (
                    <p key={index}>{file.name}</p>
                ))}
                {selectedImages.length > 5 && (
                    <p>他{selectedImages.length - 5}件のファイルが選択されています</p>
                )}
                
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={selectedImages.length === 0}>Upload</Button>
                {response && (
                    <p>{response.message}</p>
                )}
                {error && <p>{error}</p>}
            </Box>
        </Container>
    );
};