import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';
import ArticleCard from '@/component/ArticleCard';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
    created_at: string;
};

type Articles = Article[];

async function fetchArticlesByCategory (category: string) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/articles/categories/${category}`);

    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return await response.json() as Promise<Articles>;
}

export default function CategoryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });


    const params = useParams<{category: string}>();

    const { data: articles, isLoading, error } = useQuery<Articles, Error>(
        ['article', params.category],
        () => fetchArticlesByCategory(params.category ?? '')
    );
    
    // ページネーション用
    const [page, setPage] = useState(1);
    const pageSize = 10; // 1ページあたりの表示数
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
            <h1>{params.category}の記事</h1>
            {isLoading && <div>読み込み中...</div>}
            <Box className="flex-col">
                {currentArticles?.length === 0 ? (
                    <p>{params.category}の記事: ヒットなし</p>
                ) : (
                    currentArticles?.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))
                )}
            <MuiPagination
            count={Math.ceil((Object.values(articles ?? {})?.length || 0) / pageSize)}
            page={page}
            onChange={handlePageChange}
            size='large'
            sx={{display: 'flex', justifyContent: 'center', pt: 2}}
            />
            </Box>
        </div>
    )
}