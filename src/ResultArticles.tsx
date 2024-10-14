import { useQuery } from 'react-query';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import ArticleCard from '@/component/ArticleCard';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
};

type Articles = Article[];

async function fetchArticles(keyword: string): Promise<Articles> {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/articles/search?keyword=${keyword}`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json() as Promise<Articles>;
}

/**
 * Renders a list of articles based on a keyword.
 * @returns JSX.Element
 */
export default function ResultArticles() {
    // URLパラメータからキーワードを取得
    const { keyword } = useParams<{ keyword: string }>();
    // 記事を取得
    const { data: articles, isLoading, error } = useQuery<Articles, Error>(
        ['articles', keyword],
        () => fetchArticles(keyword || '')
    );

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
                    <ArticleCard key={article.id} article={article} />
                ))
            )}
        </Box>
    );
}