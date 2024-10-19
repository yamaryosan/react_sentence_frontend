import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import CommonButton from '@/component/Button';

type UploadResponse = {
    message: string;
};

// 文章ファイルおよびデータを削除する処理
async function fetchDelete() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/api/sentences/deleteAll`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('削除に失敗しました');
    }
    return await response.json() as UploadResponse;
}

export default function SentenceFileDeleteModal() {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirmOpen = () => setConfirmOpen(true);
    const handleConfirmClose = () => setConfirmOpen(false);

    const { data: response, isLoading } = useQuery<UploadResponse>('response', fetchDelete, {
        enabled: open
    });

    // ファイルの削除処理
    const handleDelete = () => {
        handleConfirmOpen();
    };

    const handleConfirmDelete = () => {
        handleConfirmClose();
        handleOpen();
    };

    return (
        <>
            <CommonButton color="error" onClick={handleDelete}>
                <DeleteOutlined />
                文章削除
            </CommonButton>
            <Modal
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-description"
            >
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
                    <Typography id="confirm-modal-title" variant="h6" component="h2">
                        確認
                    </Typography>
                    <Typography id="confirm-modal-description" sx={{ mt: 2 }}>
                        本当に削除しますか？
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="secondary" onClick={handleConfirmDelete}>
                            はい
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleConfirmClose}>
                            いいえ
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
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
        </>
    )
};