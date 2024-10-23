import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import ArticleCard from '@/component/ArticleCard';
import { ArticleOutlined } from '@mui/icons-material';
import PageSizeSelect from '@/component/PageSizeSelect';
import { fetchArticles } from '@/api/article';
import DeviceTypeContext from '@/hooks/DeviceTypeContext';
import { useContext } from 'react';
import Pagination from '@/component/Pagination';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
};



/**
 * Renders a list of articles based on a keyword.
 * @returns JSX.Element
 */
export default function ResultArticles() {
    const deviceType = useContext(DeviceTypeContext);

    /* URLパラメータからキーワードを取得 */
    const { keyword } = useParams<{ keyword: string }>();
    /* 記事を取得 */
    const { data: articles, isLoading, error } = useQuery<Article[] | undefined>(
        ['articles', keyword],
        () => fetchArticles(keyword || '')
    );
    /* ページネーション */
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const indexOfLast = page * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentArticles = articles?.slice(indexOfFirst, indexOfLast);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box>
            {articles?.length === 0 && <p>{keyword}の検索結果: ヒットなし</p>}
            {articles && articles.length > 0 && (
                <>
                <Box sx={{display: 'flex', flexDirection: deviceType === 'desktop' ? 'row' : 'column', alignItems: 'center', gap: '0.5rem'}}>
                    <ArticleOutlined />
                    <h2 style={{fontSize: '1.2rem'}}>記事一覧({articles?.length || 0}件)</h2>
                    <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
                </Box>
                {currentArticles?.slice(0, pageSize).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                <Pagination items={articles} pageSize={pageSize} page={page} setPage={setPage} />
                </>
            )}
        </Box>
    );
}