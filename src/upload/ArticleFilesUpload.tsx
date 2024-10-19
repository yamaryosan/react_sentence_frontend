import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CommonButton from '@/component/Button';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import FireUploadButton from '@/component/FireUploadButton';

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
        // ファイルの親フォルダの1つ内側のフォルダ名を取得
        const pathSegments = file.webkitRelativePath.split('/');
        const category = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : 'default';
        formData.append('categories[]', category);
        console.log(`File: ${file.name}, Category: ${category}`);
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

    // ファイル選択ボタンがクリックされたときの処理
    const handleButtonClick = () => {
        document.getElementById('file-upload')?.click();
    };

    // ファイルのアップロード処理
    const handleUpload = async () => {
        // ファイルが選択されていない場合は処理を中断
        if (selectedFiles.length === 0) {
            return;
        }
        try {
            const response = await fetchUpload(selectedFiles);
            setResponse(response);
            setSelectedFiles([]);
        } catch (error) {
            setError(error as string);
        }
    };

    return (
        <Container>
            <h3>記事用ファイルアップロード</h3>
            <Box component="form">
                <FireUploadButton accept=".md" id="file-upload" handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} />
                {selectedFiles.length > 0 && (
                    <p>以下のファイルが選択されています</p>
                )}
                {selectedFiles.slice(0, 5).map((file, index) => (
                    <p key={index}>{file.name}</p>
                ))}
                {selectedFiles.length > 5 && (
                    <p>他{selectedFiles.length - 5}件のファイルが選択されています</p>
                )}
                <CommonButton color="primary" onClick={handleUpload} disabled={selectedFiles.length === 0}>
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