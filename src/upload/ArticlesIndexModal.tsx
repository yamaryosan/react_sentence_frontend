import { useState } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type articleTitles = {
    title: string;
    category: string;
};

async function fetchArticles() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/articles`);

    if (!response.ok) {
        throw new Error("記事の取得に失敗しました");
    }
    return (await response.json()) as articleTitles[];
}

/**
 * 記事一覧のモーダル
 */
export default function ArticlesIndexModal() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const { data: articles, isLoading } = useQuery<articleTitles[]>(
        "articles",
        fetchArticles,
        {
            enabled: open /* モーダルが開いた時のみ記事をフェッチする */,
        }
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxHeight: "80%",
                    overflowY: "auto",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    記事一覧
                </Typography>
                {isLoading && (
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        読み込み中...
                    </Typography>
                )}
                {articles?.map((article, index) => (
                    <Typography
                        key={index}
                        id="modal-description"
                        sx={{ mt: 2 }}
                    >
                        {article.category} : {article.title}
                    </Typography>
                ))}
            </Box>
        </Modal>
    );
}
