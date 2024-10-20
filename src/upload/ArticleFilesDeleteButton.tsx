import { useState } from 'react';
import { useQuery } from 'react-query';
import CommonButton from '@/component/Button';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import CommonDeleteModal from '@/component/CommonDeleteModal';

type UploadResponse = {
    message: string;
};

/**
 * 記事ファイルを全削除する処理
 * @returns 記事ファイルの削除結果
 */
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
     * 記事ファイルを全削除する処理
     */
    const handleDelete = async () => {
        try {
            const response = await fetchDeleteAll();
            setResponse(response);
            setIsModalOpen(false);
        } catch (error) {
            setError(error as string);
        }
    };

    return (
        <>
            <CommonButton color="error" onClick={handleDeleteButton}>
                <DeleteOutlined />
                記事削除
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