import { useQuery } from 'react-query';
import { useState } from 'react';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';

import MuiPagination from '@mui/material/Pagination';

type Sentence = {
    id: number;
    sentence: string;
};

type Sentences = Sentence[];

const fetchSentences = async (keyword: string): Promise<Sentences> => {
    const response = await fetch(`http://localhost/sentences/search?keyword=${keyword}`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json();
};

export default function ResultSentences() {
    // URLパラメータからキーワードを取得
    const { keyword } = useParams<{ keyword: string }>();
    // 文章を取得
    const { data: sentences, isLoading, error } = useQuery<Sentences>(['sentences', keyword], () => fetchSentences(keyword || ''));

    // ページネーション用
    const [page, setPage] = useState(1);
    const pageSize = 100; // 1ページあたりの表示数
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const indexOfLast = page * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentSentences = sentences?.slice(indexOfFirst, indexOfLast);

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
                            <p>{sentence.sentence}</p>
                        </div>
                    ))
                )}
                <MuiPagination count={Math.ceil((sentences?.length || 0) / pageSize)} page={page} onChange={handlePageChange} />
        </Box>
    );
}