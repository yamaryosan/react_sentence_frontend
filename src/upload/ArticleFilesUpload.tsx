import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CommonButton from '@/component/Button';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import FireUploadButton from '@/component/FireUploadButton';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import { fetchUpload } from '@/api/article';

/**
 * 記事ファイルをアップロードするボタン
 */
export default function ArticleFilesUpload() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [response, setResponse] = useState<{message: string} | null>(null);
    const [error, setError] = useState<string>('');

    /**
     * ファイルが選択されたときの処理
     * @param event イベント
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            /* 名前順にソート */
            setSelectedFiles(Array.from(files).sort((a, b) => a.name.localeCompare(b.name)));
        }
    };

    /**
     * ファイル選択ボタンがクリックされたときの処理
     */
    const handleButtonClick = () => {
        document.getElementById('article-file-upload')?.click();
    };

    /**
     * ファイルのアップロード処理
     */
    const handleUpload = async () => {
        /* ファイルが選択されていない場合は処理を中断 */
        if (selectedFiles.length === 0) {
            return;
        }
        try {
            const result = await fetchUpload(selectedFiles);
            setResponse(result);
            setSelectedFiles([]);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <>
            <h3>記事用ファイルアップロード</h3>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '0.5rem' }}>
                <FireUploadButton accept=".md" id="article-file-upload" multiple={true} directory={true} handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} />
                {selectedFiles.length > 0 && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ArticleOutlined />
                            <span>以下のファイルが選択されています</span>
                        </Box>
                    </>
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
        </>
    );
};
