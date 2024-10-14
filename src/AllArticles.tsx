import React from 'react';
import {useQuery} from 'react-query';
import Article from './Article';
import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';
import ArticleCard from './ArticleCard';
import {useEffect} from 'react';

type Article = {
    id: number;
    title: string;
    content: string;
    imagePaths: string[];
};

type Articles = Article[];

const fetchArticleItem = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/articles`);
    if (!response.ok) {
        throw new Error('記事が見つかりません');
    }
    return response.json() as Promise<Articles>;
};

export default function AllArticles() {
    const {data: articles, isLoading, isError} = useQuery<Articles, Error>(
        'article',
        () => fetchArticleItem()
    );

    // ページネーション用の変数
    const [page, setPage] = React.useState(1);
    const pageSize = 10;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    // ページネーションがクリックされたときに自動でページトップにスクロールする
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);


    const indexOfLast = page * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentArticles = articles?.slice(indexOfFirst, indexOfLast);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }
    return (
        <Box className="flex-col">
            <h1 className="text-2xl font-bold">記事一覧</h1>
            {currentArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
                <MuiPagination
                count={Math.ceil((articles?.length || 0) / pageSize)}
                page={page}
                onChange={handlePageChange}
                size='large'
                sx={{display: 'flex', justifyContent: 'center', pt: 2, pb: 2}}
                />
        </Box>
    );
}
