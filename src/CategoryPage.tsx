import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';
import ArticleCard from '@/component/ArticleCard';
import { fetchArticlesByCategory } from '@/api/article';
import PageSizeSelect from '@/component/PageSizeSelect';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
    created_at: string;
};

type Articles = Article[];

export default function CategoryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const params = useParams<{category: string}>();

    const { data: articles, isLoading, error } = useQuery<Articles | undefined>(
        ['article', params.category],
        () => fetchArticlesByCategory(params.category ?? '')
    );
    
    // ページネーション用の変数
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const indexOfLast = page * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentArticles = Object.values(articles ?? {})?.slice(indexOfFirst, indexOfLast);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }
    
    return (
        <div>
            {isLoading && <div>読み込み中...</div>}
            {articles?.length === 0 && (<p>{params.category}の記事: ヒットなし</p>)}
            {articles && articles.length > 0 && (
                <>
                <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <h2>{params.category}の記事一覧({articles?.length || 0}件)</h2>
                    <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
                </Box>
                {currentArticles?.slice(0, pageSize).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                <MuiPagination
                count={Math.ceil((articles?.length || 0) / pageSize)}
                page={page}
                onChange={(e, value) => setPage(value)}
                size='large'
                sx={{display: 'flex', justifyContent: 'center', paddingY: '1rem'}} />
                </>
            )}
        </div>
    )
}