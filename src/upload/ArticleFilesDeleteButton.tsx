import { useState } from 'react';
import { useQuery } from 'react-query';
import CommonButton from '@/component/Button';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import CommonDeleteModal from '@/component/CommonDeleteModal';

type UploadResponse = {
    message: string;
};

// 記事ファイルを全削除する処理
async function fetchDeleteAll() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/api/articles/deleteAll`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('削除に失敗しました');
    }
    return await response.json() as UploadResponse;
}

/**
 * 記事ファイルを全削除するボタン
 */
export default function ArticleFilesDeleteButton() {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { data: response, isLoading } = useQuery<UploadResponse>('response', fetchDeleteAll, {
        enabled: confirmOpen
    });

    // 記事ファイルを全削除するボタンを押したときの処理
    const handleDeleteButton = () => {
        setConfirmOpen(true);
    };

    // 記事ファイルを全削除するモーダルを閉じたときの処理
    const handleClose = () => {
        setConfirmOpen(false);
    };

    // 記事ファイルを全削除する処理
    const handleDelete = () => {
        setConfirmOpen(false);
    };

    return (
        <>
            <CommonButton color="error" onClick={handleDeleteButton}>
                <DeleteOutlined />
                記事削除
            </CommonButton>
            <CommonDeleteModal
                open={confirmOpen}
                handleClose={handleClose}
                handleDelete={handleDelete} 
            />
        </>
    );
};