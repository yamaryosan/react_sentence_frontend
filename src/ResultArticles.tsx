import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import ArticleCard from "@/component/ArticleCard";
import { ArticleOutlined } from "@mui/icons-material";
import PageSizeSelect from "@/component/PageSizeSelect";
import { fetchArticles } from "@/api/article";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { useContext } from "react";
import Pagination from "@/component/Pagination";

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
};

/**
 * キーワード検索結果の記事一覧を表示するコンポーネント
 */
export default function ResultArticles() {
    const deviceType = useContext(DeviceTypeContext);
    const [articles, setArticles] = useState<Article[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    /* URLパラメータからキーワードを取得 */
    const { keyword } = useParams<{ keyword: string }>();

    /* ページネーション */
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    /* ページサイズが変更されたときにページを1に戻す */
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    /* データを取得 */
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchArticles(keyword || "", page, pageSize);
            if (result) {
                setArticles(result.articles);
                setTotalCount(result.totalCount);
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, page, pageSize]);

    return (
        <Box>
            {isLoading && <p>読み込み中...</p>}
            {totalCount === 0 && !isLoading && (
                <p>{keyword}の検索結果: ヒットなし</p>
            )}
            {totalCount > 0 && (
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
                        <ArticleOutlined />
                        <h2 style={{ fontSize: "1.2rem" }}>
                            記事一覧({totalCount || 0}件)
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
        </Box>
    );
}
