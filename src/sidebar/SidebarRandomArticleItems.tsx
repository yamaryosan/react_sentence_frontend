import {useQuery} from 'react-query';
import SidebarThumbnailBox from '@/component/ThumbnailBox';
import { fetchRandomArticles } from '@/api/article';
import { Link } from 'react-router-dom';
import Image from '@/component/Image';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
};

const maxArticleLength = 5;
export default function SidebarRandomArticleItems() {
    const {data: articles, isLoading, error} = useQuery<Article[] | undefined>('randomArticles', fetchRandomArticles);

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
                            <Image imagePath={article.imagePaths[0]} />
                            <p>{article.title}({article.category})</p>
                        </SidebarThumbnailBox>
                    </Link>
                </li>
            ))}
            </ul>
        </>
    );
}