import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import CommonButton from '@/component/Button';
import FireUploadButton from '@/component/FireUploadButton';

type UploadResponse = {
    message: string;
};

/**
 * 文章ファイルのアップロード
 * @param file アップロードするファイル
 * @returns アップロード結果
 */
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

/**
 * 文章ファイルのアップロード
 * @returns 文章ファイルのアップロードコンポーネント
 */
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

    // ファイル選択ボタンがクリックされたときの処理
    const handleButtonClick = () => {
        document.getElementById('sentence-file-upload')?.click();
    };

    // ファイルのアップロード処理
    const handleUpload = async () => {
        // ファイルが選択されていない場合は処理を中断
        if (!selectedFile) {
            return;
        }
        try {
            const response = await fetchUpload(selectedFile);
            setResponse(response);
            setSelectedFile(null);
        } catch (error) {
            setError(error as string);
        }   
    };

    return (
        <>
            <h3>文章ファイルアップロード</h3>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '0.5rem' }}>
                <FireUploadButton accept=".txt" id="sentence-file-upload" multiple={false} directory={false} handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} />
                <CommonButton color="primary" onClick={handleUpload} disabled={selectedFile === null}>
                    <UploadOutlined />
                    アップロード
                </CommonButton>
                {response && (
                    <p>{response.message}</p>
                )}
                {error && <p>{error}</p>}
            </Box>
        </>
    );
};