import React from 'react';
import {useQuery} from 'react-query';
import Article from './Article';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import ThumbnailBox from './ThumbnailBox';

type Article = {
    id: number;
    title: string;
    content: string;
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
        <Box className="flex-col">
            {articles?.map((article) => (
                <Box key={article.id}
                className=" bg-white pd-2 border border-transparent hover:border hover:border-blue-600 transition duration-2 mb-2">
                    <Link to={`/articles/${article.id}`}>
                        <div className="flex justify-center items-center h-[200px] overflow-hidden">
                        <img src={article.imagePaths[0]} alt="thumbnail" className="max-h-full max-w-full object-contain"/>
                        </div>
                        <h1 className="pt-2 px-4 text-center xs:text-xl md:text-2xl">{article.title}</h1>
                        <p className="px-4 text-lg xs:line-clamp-3 sm:line-clamp-5 md:line-clamp-6">{article.content}</p>
                    </Link>
                </Box>
            ))}
        </Box>
    );
}
