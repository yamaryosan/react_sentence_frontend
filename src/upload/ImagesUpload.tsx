import React, { useState } from 'react';
import Box from '@mui/material/Box';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import CommonButton from '@/component/Button';
import FireUploadButton from '@/component/FireUploadButton';

type UploadResponse = {
    message: string;
    count: number;
};

/**
 * 複数ファイルのアップロード処理
 * @param files アップロードするファイルの配列
 * @returns アップロード結果
 */ 
async function fetchUpload(files: File[]) {
    try {
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
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export default function ImagesUpload() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [response, setResponse] = useState<UploadResponse | undefined>(undefined);
    const [error, setError] = useState<string>('');

    /**
     * ファイルが選択されたときの処理
     * @param event イベント
     */
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedImages(Array.from(files));
        }
    };

    /**
     * ファイル選択ボタンがクリックされたときの処理
     */
    const handleButtonClick = () => {
        document.getElementById('image-upload')?.click();
    };

    /**
     * ファイルのアップロード処理
     */
    const handleUpload = async () => {
        /* ファイルが選択されていない場合は処理を中断 */
        if (selectedImages.length === 0) {
            return;
        }
        try {
            const response = await fetchUpload(selectedImages);
            setResponse(response);
            setSelectedImages([]);
        } catch (error) {
            setError(error as string);
        }
    };

    return (
        <>
            <h3>画像ファイルアップロード</h3>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '0.5rem' }}>
                <FireUploadButton accept="image/*" id="image-upload" multiple={true} directory={true} handleFileChange={handleImageChange} handleButtonClick={handleButtonClick} />
                {selectedImages.length > 0 && (
                    <p>以下のファイルが選択されています</p>
                )}
                {selectedImages.slice(0, 5).map((file, index) => (
                    <p key={index}>{file.name}</p>
                ))}
                {selectedImages.length > 5 && (
                    <p>他{selectedImages.length - 5}件のファイルが選択されています</p>
                )}
                
                <CommonButton color="primary" onClick={handleUpload} disabled={selectedImages.length === 0}>
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