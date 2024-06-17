import { useQuery } from 'react-query';
import { useState } from 'react';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import MuiPagination from '@mui/material/Pagination';

type Sentence = {
    id: number;
    sentence: string;
};

type Sentences = {
    [key: string]: Sentence;
}

const fetchSentences = async (keyword: string): Promise<Sentences> => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/sentences/search?keyword=${keyword}`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json() as Promise<Sentences>;
};

export default function ResultSentences() {
    // URLパラメータからキーワードを取得
    const { keyword } = useParams<{ keyword: string }>();
    // 文章を取得
    const { data: sentences, isLoading, error } = useQuery<Sentences>(['sentences', keyword], () => fetchSentences(keyword || ''));

    // ページネーション用
    const [page, setPage] = useState(1);
    const pageSize = 50; // 1ページあたりの表示数
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    // ページネーションがクリックされたときに自動でページトップにスクロールする
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const indexOfLast = page * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    // const currentSentences = sentences?.slice(indexOfFirst, indexOfLast);
    const currentSentences = Object.values(sentences ?? {})?.slice(indexOfFirst, indexOfLast);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box sx={{
            textAlign: 'left',
            }}>
                {currentSentences?.length === 0 ? (
                    <p>{keyword}の検索結果: ヒットなし</p>
                ) : (
                    currentSentences?.map((sentence) => (
                        <div key={sentence.id}>
                            <p>{sentence.sentence.split('\n').map(line => {
                                return (
                                    <span key={line}>{line}<br /></span>
                                );
                            })}</p>
                        </div>
                    ))
                )}
                <MuiPagination
                 count={Math.ceil((Object.values(sentences ?? {})?.length || 0) / pageSize)}
                 page={page}
                 onChange={handlePageChange}
                 size='large'
                 sx={{display: 'flex', justifyContent: 'center', pt: 2}}
                 />
        </Box>
    );
}