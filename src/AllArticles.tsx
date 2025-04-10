import { useState } from "react";
import Box from "@mui/material/Box";
import ArticleCard from "@/component/ArticleCard";
import { useEffect } from "react";
import { fetchAllArticles } from "@/api/article";
import { ArticleOutlined } from "@mui/icons-material";
import PageSizeSelect from "@/component/PageSizeSelect";
import Pagination from "@/component/Pagination";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { useContext } from "react";

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
};

export default function AllArticles() {
    const deviceType = useContext(DeviceTypeContext);
    const [articles, setArticles] = useState<Article[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    /* ページネーション */
    const [pageSize, setPageSize] = useState(50);
    const [page, setPage] = useState(1);

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    /* データを取得 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await fetchAllArticles(page, pageSize);
                if (result) {
                    setArticles(result.articles);
                    setTotalCount(result.totalCount);
                }
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [page, pageSize]);

    if (isLoading) {
        return <p>読み込み中...</p>;
    }

    if (error) {
        return <p>読み込みに失敗しました</p>;
    }

    if (totalCount === 0) {
        return <p>記事がありません</p>;
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: deviceType === "desktop" ? "row" : "column",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                <ArticleOutlined />
                <h2 style={{ fontSize: "1.2rem" }}>
                    記事一覧({totalCount || 0}件)
                </h2>
                <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
            </Box>
            {articles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
            <Pagination
                total={totalCount}
                pageSize={pageSize}
                page={page}
                setPage={setPage}
            />
        </>
    );
}
