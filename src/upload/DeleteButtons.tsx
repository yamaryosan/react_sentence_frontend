import { Box } from "@mui/material";
import ArticleFilesDeleteModal from "@/upload/ArticleFilesDeleteModal";
import ImagesDeleteModal from "@/upload/ImagesDeleteModal";
import SentenceFileDeleteModal from "@/upload/SentenceFileDeleteModal";

export default function DeleteButtons() {
    return (
        <>
            <h3>削除</h3>
            <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '0.5rem' }}>
                <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: '1rem' }}>
                    <ArticleFilesDeleteModal />
                    <ImagesDeleteModal />
                    <SentenceFileDeleteModal />
                </Box>
            </Box>
        </>
    )
}