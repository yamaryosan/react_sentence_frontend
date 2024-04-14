import {useQuery} from 'react-query';
import Article from './Article';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';

type Article = {
    id: number;
    title: string;
};

type Articles = Article[];

const fetchArticleItem = async () => {
    const response = await fetch(`http://localhost/api/articles`);
    if (!response.ok) {
        throw new Error('記事が見つかりません');
    }
    return response.json() as Promise<Articles>;
};

export default function NewArticles() {
    const {data: articles, isLoading, isError} = useQuery<Articles, Error>(
        'article',
        () => fetchArticleItem()
    );

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }
    return (
        <Box sx={{textAlign: 'left'}}>
            {articles?.map((article) => (
                <Link to={`/article/${article.id}`}>
                    <h1>{article.title}</h1>
                </Link>
            ))}
        </Box>
    );
}
