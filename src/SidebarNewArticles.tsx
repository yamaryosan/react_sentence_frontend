import {useQuery} from 'react-query';
import Box from '@mui/material/Box';
import React from 'react';

type Article = {
    id: number;
    title: string;
    imagePaths: string[];
};

type Articles = Article[];

const fetchArticleItem = async () => {
    const response = await fetch(`http://localhost/api/articles`);
    if (!response.ok) {
        throw new Error('記事が見つかりません');
    }
    return response.json() as Promise<Articles>;
};

const maxArticleLength = 6;

export default function SidebarNewArticles() {
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
            <ul>
            {articles?.slice(0, maxArticleLength).map((article) => (
                <li key={article.id} className="mt-4">
                    <a className="group hover:text-blue-700 cursor-pointer" href={`/articles/${article.id}`} >
                        <Box
                            component="img"
                            sx={{
                                objectFit: 'cover',
                                width: '100%',
                            }}
                            alt="thumbnail"
                            src={article.imagePaths[0]}
                            className="group-hover:bg-gray-200 transition duration-2"
                        />
                        <p className="group-hover:bg-gray-200 transition duration-2">{article.title}</p>
                    </a>
                </li>
            ))}
            </ul>
        </React.Fragment>
    );
}