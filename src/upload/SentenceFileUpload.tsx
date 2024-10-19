import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import CommonButton from '@/component/Button';

type UploadResponse = {
    message: string;
};

// 複数ファイルのアップロード処理
async function fetchUpload(file: File) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${apiUrl}/api/sentences/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('アップロードに失敗しました');
    }
    return await response.json() as UploadResponse;
}

export default function SentenceFileUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [response, setResponse] = useState<UploadResponse | null>(null);
    const [error, setError] = useState<string>('');

    // ファイルが選択されたときの処理
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // ファイルのアップロード処理
    const handleUpload = () => {
        // ファイルが選択されていない場合は処理を中断
        if (!selectedFile) {
            return;
        }
        fetchUpload(selectedFile)
            .then((data) => {
                setResponse(data);
                setSelectedFile(null);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Container>
            <h3>文章ファイルアップロード</h3>
            <Box component="form">
                <input
                    style={{ display: 'none' }}
                    id="sentence-file-upload"
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                />
                <label htmlFor="sentence-file-upload">
                    <Button variant="contained" component="span">
                    ファイルを選択
                    </Button>
                </label>
                <CommonButton color="primary" onClick={handleUpload} disabled={selectedFile === null}>
                    <UploadOutlined />
                    アップロード
                </CommonButton>
                {response && (
                    <p>{response.message}</p>
                )}
                {error && <p>{error}</p>}
            </Box>
        </Container>
    );
};