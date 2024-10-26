import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ArticleCard from '@/component/ArticleCard';
import { fetchArticlesByCategory } from '@/api/article';
import PageSizeSelect from '@/component/PageSizeSelect';
import DeviceTypeContext from '@/hooks/DeviceTypeContext';
import { useContext } from 'react';
import Pagination from '@/component/Pagination';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
    created_at: string;
};

export default function CategoryPage() {
    const deviceType = useContext(DeviceTypeContext);
    const [articles, setArticles] = useState<Article[]>([]);
    const [totalCount, setTotalCount] = useState(0);

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
            const result = await fetchArticlesByCategory(category ?? '', page, pageSize);
            if (result) {
                setArticles(result.articles);
                setTotalCount(result.totalCount);
            }
        };
        fetchData();
    }, [category, page, pageSize]);
    
    return (
        <div>
            {totalCount === 0 && (<p>{category}の記事: ヒットなし</p>)}
            {totalCount > 0 && (
                <>
                <Box sx={{display: 'flex', flexDirection: deviceType === 'desktop' ? 'row' : 'column', alignItems: 'center', gap: '0.5rem'}}>
                    <h2 style={{fontSize: '1.2rem'}}>{category}の記事一覧({totalCount || 0}件)</h2>
                    <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
                </Box>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                <Pagination total={totalCount} pageSize={pageSize} page={page} setPage={setPage} />
                </>
            )}
        </div>
    )
}