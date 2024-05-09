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
                        <h1 className="pt-2 text-center xs:text-xl md:text-2xl">{article.title}</h1>
                        <div className="flex pb-4">
                            <div className="w-2/5 px-4">
                            <ThumbnailBox width="100%">
                            <img src={article.imagePaths[0]} alt="thumbnail" />
                            </ThumbnailBox>
                            </div>
                            <p className="line-clamp-1 w-3/5 px-4 text-lg">{article.content}</p>
                        </div>
                    </Link>
                </Box>
            ))}
        </Box>
    );
}
