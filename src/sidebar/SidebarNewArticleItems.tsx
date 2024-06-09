import {useQuery} from 'react-query';
import Box from '@mui/material/Box';
import React from 'react';
import SidebarThumbnailBox from './SidebarThumbnailBox';

type Article = {
    id: number;
    title: string;
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

const maxArticleLength = 6;

export default function SidebarNewArticleItems() {
    const {data: articles, isLoading, isError} = useQuery<Articles, Error>(
        'side_new_articles',
        () => fetchArticleItem()
    );

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <React.Fragment>
            <h3 className="text-xl">最新記事</h3>
            <ul className="xs:grid grid-cols-2 md:block">
            {articles?.slice(0, maxArticleLength).map((article) => (
                <li key={article.id} className="border border-gray-2 xs:m-2 md:mb-2 hover:border hover:border-blue-600 ">
                    <a href={`/articles/${article.id}`}
                    className="group hover:text-blue-700 cursor-pointer">
                        <SidebarThumbnailBox>
                            <img src={article.imagePaths[0]} alt="thumbnail" />
                        </SidebarThumbnailBox>
                        <p className="xs:text-sm md:text-md">{article.title}</p>
                    </a>
                </li>
            ))}
            </ul>
        </React.Fragment>
    );
}