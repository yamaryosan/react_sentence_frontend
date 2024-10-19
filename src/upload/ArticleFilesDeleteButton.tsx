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
    const [open, setOpen] = useState(false);
    const { data: response, isLoading } = useQuery<UploadResponse>('response', fetchDeleteAll, {
        enabled: open
    });

    const handleDelete = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <>
            <CommonButton color="error" onClick={handleDelete}>
                <DeleteOutlined />
                記事削除
            </CommonButton>
            <CommonDeleteModal
                open={open}
                handleClose={handleClose}
                handleDelete={handleDelete} 
            />
        </>
    );
};