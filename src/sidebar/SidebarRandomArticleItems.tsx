import SidebarThumbnailBox from '@/component/ThumbnailBox';
import { fetchRandomArticles } from '@/api/article';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '@/component/Image';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
};

const maxArticleLength = 5;
export default function SidebarRandomArticleItems() {

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            const result = await fetchRandomArticles();
            if (result) {
                setArticles(result);
            }
            setIsLoading(false);
        };
        fetchArticles();
    }, []);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            {articles && articles.length > 0 && (
                <h3>ランダム</h3>
            )}
            <ul>
            {articles?.slice(0, maxArticleLength).map((article) => (
                <li key={article.id}>
                    <Link to={`/articles/${article.id}`} onClick={handleClick}>
                        <SidebarThumbnailBox>
                            <p>{article.title}({article.category})</p>
                        </SidebarThumbnailBox>
                    </Link>
                </li>
            ))}
            </ul>
        </>
    );
}