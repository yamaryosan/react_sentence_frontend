import { Box } from "@mui/material";
import ArticleFilesDeleteButton from "@/upload/ArticleFilesDeleteButton";
import ImagesDeleteButton from "@/upload/ImagesDeleteButton";
import SentenceFileDeleteButton from "@/upload/SentenceFileDeleteButton";

/**
 * 削除ボタンをまとめたコンポーネント
 */
export default function DeleteButtons() {
    return (
        <>
            <h3>削除</h3>
            <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '0.5rem' }}>
                <ArticleFilesDeleteButton />
                <ImagesDeleteButton />
                <SentenceFileDeleteButton />
            </Box>
        </>
    )
}