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

// 画像を全削除する処理
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
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { data: response, isLoading } = useQuery<UploadResponse>('response', fetchDeleteAll, {
        enabled: confirmOpen
    });

    // 画像を全削除するボタンを押したときの処理
    const handleDeleteButton = () => {
        setConfirmOpen(true);
    };

    // 画像を全削除するモーダルを閉じたときの処理
    const handleClose = () => {
        setConfirmOpen(false);
    };

    // 画像を全削除する処理
    const handleDelete = () => {
        setConfirmOpen(false);
    };

    return (
        <>
            <CommonButton color="error" onClick={handleDeleteButton}>
                <DeleteOutlined />
                画像削除
            </CommonButton>
            <CommonDeleteModal
                open={confirmOpen}
                handleClose={handleClose}
                handleDelete={handleDelete} 
            />
        </>
    );
};