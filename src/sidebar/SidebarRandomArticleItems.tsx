import {useQuery} from 'react-query';
import React from 'react';
import SidebarThumbnailBox from './SidebarThumbnailBox';
import { fetchRandomArticles } from '@/api/article';

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

    return (
        <React.Fragment>
            <h3>ランダム</h3>
            <ul>
            {articles?.slice(0, maxArticleLength).map((article) => (
                <li key={article.id}>
                    <a href={`/articles/${article.id}`}>
                        <SidebarThumbnailBox>
                            <img src={article.imagePaths[0]} alt="thumbnail" />
                        </SidebarThumbnailBox>
                        <p>{article.title} - {article.category}</p>
                    </a>
                </li>
            ))}
            </ul>
        </React.Fragment>
    );
}