import {useQuery} from 'react-query';
import Box from '@mui/material/Box';

type Article = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
};

type ArticleProps = {
    id: number;
};

const fetchArticle = async (id: number) => {
    const response = await fetch(`http://localhost/api/articles/${id}`);
    if (!response.ok) {
        throw new Error('記事が見つかりません');
    }
    return response.json() as Promise<Article>;
};

export default function Article({id}: ArticleProps) {
    const {data: article, isLoading, isError} = useQuery<Article, Error>(
        ['article', id],
        () => fetchArticle(id)
    );

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box sx={{textAlign: 'left'}}>
            <h1>{article?.title}</h1>
            <p>{article?.content}</p>
            <p>{article?.updated_at}</p>
        </Box>
    );
}