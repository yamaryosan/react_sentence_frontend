import { ArticleOutlined } from '@mui/icons-material';
import CommonButton from '@/component/Button';
import ArticlesIndexModal from '@/upload/ArticlesIndexModal';
import { Box } from '@mui/material';
import { useState } from 'react';
/**
 * 情報一覧ボタン
 */
export default function IndexButton() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <h3>一覧</h3>
            <Box sx={{ display: 'flex', gap: '1rem',flexDirection: 'column', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '0.5rem' }}>
                <CommonButton color="primary" onClick={handleOpen}>
                    <ArticleOutlined />
                    記事一覧
                </CommonButton>
            </Box>
        </>
    )
}