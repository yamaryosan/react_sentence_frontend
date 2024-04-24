import { useQuery } from 'react-query';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';

type Article = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

type Articles = Article[];

const fetchArticles = async (keyword: string): Promise<Articles> => {
    const response = await fetch(`http://localhost/articles/search?keyword=${keyword}`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json();
};

export default function ResultArticles() {
    // URLパラメータからキーワードを取得
    const { keyword } = useParams<{ keyword: string }>();
    // 記事を取得
    const { data: articles, isLoading, error } = useQuery<Articles>(['articles', keyword], () => fetchArticles(keyword || ''));

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box>
                {articles?.length === 0 ? (
                    <p>{keyword}の検索結果: ヒットなし</p>
                ) : (
                    articles?.map((article) => (
                        <div key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                            <p>{article.created_at}</p>
                        </div>
                    ))
                )}
        </Box>
    );
}