import React, { useState } from 'react';
import CommonButton from '@/component/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import CommonDeleteModal from '@/component/CommonDeleteModal';

type UploadResponse = {
    message: string;
};

/**
 * 画像を全削除する処理
 * @returns 削除結果
 */
async function fetchDeleteAll() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/api/articleImages/deleteAll`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('削除に失敗しました');
    }
    return await response.json() as UploadResponse;
}

/**
 * 画像を全削除するボタン
 */
export default function ImagesDeleteButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [response, setResponse] = useState<UploadResponse | null>(null);
    const [error, setError] = useState<string>('');

    /**
     * 全削除ボタンを押したときの処理
     */
    const handleDeleteButton = () => {
        setIsModalOpen(true);
    };

    /**
     * モーダルを閉じたときの処理
     */
    const handleClose = () => {
        setIsModalOpen(false);
    };

    /**
     * 画像を全削除する処理
     */
    const handleDelete = async () => {
        try {
            const response = await fetchDeleteAll();
            setResponse(response);
            setIsModalOpen(false);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <>
            <CommonButton color="error" onClick={handleDeleteButton}>
                <DeleteOutlined />
                画像削除
            </CommonButton>
            <CommonDeleteModal
                open={isModalOpen}
                handleClose={handleClose}
                handleDelete={handleDelete} 
            />
            {response && <p>{response.message}</p>}
            {error && <p>{error}</p>}
        </>
    );
};