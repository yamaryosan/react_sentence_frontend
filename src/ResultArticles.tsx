import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";

type Article = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

type Articles = Article[];

const fetchArticle = async (keyword: string) => {
    if (!keyword) {
        throw new Error('キーワードが不正です');
    }
    const response = await fetch(`http://localhost/api/search?keyword=${keyword}`);
    if (!response.ok) {
        return [];
    }
    return response.json() as Promise<Articles>;
};

export default function ResultArticles() {
    const params = useParams<{keyword: string}>();

    const {data: articles, isLoading, isError} = useQuery<Articles, Error>(
        ['article', params.keyword],
        () => fetchArticle(params.keyword ?? ''),
    );

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box sx={{
            textAlign: 'left',
            pl: {xs: 5, md: 25}}}>
                {articles?.length === 0 ? 
                (<div>記事が見つかりません</div>
                ) : (
                articles?.map((article) => (
                    <div key={article.id}>
                        <h1>{article.title}</h1>
                        <p>{article.content}</p>
                        <p>{article.created_at}</p>
                    </div>
                )))
                }
        </Box>
    );
}