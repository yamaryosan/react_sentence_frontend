import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import ArticleCard from "@/component/ArticleCard";
import { fetchArticlesByCategory } from "@/api/article";
import PageSizeSelect from "@/component/PageSizeSelect";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { useContext } from "react";
import Pagination from "@/component/Pagination";

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
};

export default function CategoryPage() {
    const deviceType = useContext(DeviceTypeContext);
    const [articles, setArticles] = useState<Article[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState<Error | null>(null);

    /* URLパラメータからカテゴリーを取得 */
    const { category } = useParams<{ category: string }>();

    /* ページネーション */
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    /* データを取得 */
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await fetchArticlesByCategory(
                category ?? "",
                page,
                pageSize
            );
            if (result) {
                setArticles(result.articles);
                setTotalCount(result.totalCount);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [category, page, pageSize]);

    return (
        <div>
            {isLoading && <p>読み込み中...</p>}
            {error && <p>読み込みに失敗しました</p>}
            {totalCount === 0 && !isLoading && !error && (
                <p>{category}の記事: ヒットなし</p>
            )}
            {totalCount > 0 && !isLoading && !error && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection:
                                deviceType === "desktop" ? "row" : "column",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <h2 style={{ fontSize: "1.2rem" }}>
                            {category}の記事一覧({totalCount || 0}件)
                        </h2>
                        <PageSizeSelect
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />
                    </Box>
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                    <Pagination
                        total={totalCount}
                        pageSize={pageSize}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </div>
    );
}
