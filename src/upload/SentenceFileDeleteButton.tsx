import { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import CommonButton from '@/component/Button';
import CommonDeleteModal from '@/component/CommonDeleteModal';

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

/**
 * 文章ファイルおよびデータを削除するボタン
 */
export default function SentenceFileDeleteButton() {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data: response, isLoading } = useQuery<UploadResponse>('response', fetchDelete, {
        enabled: confirmOpen
    });

    // ファイルの削除処理
    const handleDelete = () => {
        setConfirmOpen(true);
    };

    const handleClose = () => {
        setConfirmOpen(false);
    };

    return (
        <>
            <CommonButton color="error" onClick={handleDelete}>
                <DeleteOutlined />
                文章ファイル削除
            </CommonButton>
            <CommonDeleteModal open={confirmOpen} handleClose={handleClose} handleDelete={handleDelete} />
        </>
    )
};