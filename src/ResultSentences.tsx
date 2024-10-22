import { useQuery } from 'react-query';
import { useState } from 'react';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSentences } from '@/api/sentence';
import PageSizeSelect from '@/component/PageSizeSelect';
import { AbcOutlined } from '@mui/icons-material';

import MuiPagination from '@mui/material/Pagination';
import SentenceSearchWindow from './searchWindow/SentenceSearchWindow';

type Sentence = {
    id: number,
    sentence: string,
}

export default function ResultSentences() {
    /* URLパラメータからキーワードを取得 */
    const { keyword } = useParams<{ keyword: string }>();
    /* 文章を取得 */
    const { data: sentences, isLoading, error } = useQuery<Sentence[] | undefined>(
        ['sentences', keyword],
        () => fetchSentences(keyword || '')
    );
    /* ページネーション */
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

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
        <>
            <SentenceSearchWindow />
            <Box sx={{ textAlign: 'left',}}>
                {currentSentences?.length === 0 && ( <p>{keyword}の検索結果: ヒットなし</p> )}
                {currentSentences && currentSentences?.length > 0 && (
                    <>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <AbcOutlined />
                        <h2>文章一覧({sentences?.length}件)</h2>
                        <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
                    </Box>
                    {currentSentences?.map((sentence) => (
                        <div key={sentence.id}>
                            <p>{sentence.sentence.split('\n').map(line => {
                                return (
                                    <span key={line}>{line}<br /></span>
                                );
                            })}</p>
                        </div>
                    ))}
                <MuiPagination
                 count={Math.ceil((Object.values(sentences ?? {})?.length || 0) / pageSize)}
                 page={page}
                 onChange={handlePageChange}
                 size='large'
                 sx={{display: 'flex', justifyContent: 'center', pt: 2}} />
                </>
                )}
            </Box>
        </>
    );
}