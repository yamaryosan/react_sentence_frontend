import React, { useState } from 'react';
import CommonButton from '@/component/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

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

export default function ImagesDeleteModal() {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirmOpen = () => setConfirmOpen(true);
    const handleConfirmClose = () => setConfirmOpen(false);

    const { data: response, isLoading } = useQuery<UploadResponse>('response', fetchDeleteAll, {
        enabled: open
    });

    // 画像の削除処理
    const handleDelete = () => {
        handleConfirmOpen();
    };

    const handleConfirmDelete = () => {
        handleConfirmClose();
        handleOpen();
    };

    return (
        <Container>
            <CommonButton color="error" onClick={handleDelete}>
                <DeleteOutlined />
                画像削除
            </CommonButton>
            <Modal open={confirmOpen} onClose={handleConfirmClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2">
                        確認
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        本当に削除しますか？
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <CommonButton color="secondary" onClick={handleConfirmDelete}>
                            はい
                        </CommonButton>
                        <CommonButton color="primary" onClick={handleConfirmClose}>
                            いいえ
                        </CommonButton>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {isLoading && <p>削除中...</p>}
                    {response && <p>{response.message}</p>}
                </Box>
            </Modal>
        </Container>
    )
};