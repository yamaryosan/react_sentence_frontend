import { useState } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSentences } from "@/api/sentence";
import PageSizeSelect from "@/component/PageSizeSelect";
import { AbcOutlined } from "@mui/icons-material";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { useContext } from "react";
import Pagination from "@/component/Pagination";

import SentenceSearchWindow from "@/searchWindow/SentenceSearchWindow";
import SentenceCard from "@/component/SentenceCard";

type Sentences = {
    sentence: string;
    id: number;
};

export default function ResultSentences() {
    const deviceType = useContext(DeviceTypeContext);
    const [sentences, setSentences] = useState<Sentences[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    /* URLパラメータからキーワードを取得 */
    const { keyword } = useParams<{ keyword: string }>();

    /* ページネーション */
    const [pageSize, setPageSize] = useState(50);
    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [error] = useState<Error | null>(null);

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    /* ページサイズが変更されたときにページを1に戻す */
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    /* データを取得 */
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await fetchSentences(keyword || "", page, pageSize);
            if (result) {
                setSentences(result.sentences);
                setTotalCount(result.totalCount);
            }
            setIsLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, page, pageSize]);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <>
            <SentenceSearchWindow />
            <Box sx={{ textAlign: "left" }}>
                {totalCount === 0 && !isLoading && (
                    <p>{keyword}の検索結果: ヒットなし</p>
                )}
                {totalCount > 0 && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection:
                                    deviceType === "desktop" ? "row" : "column",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <AbcOutlined />
                            <h2 style={{ fontSize: "1.2rem" }}>
                                {keyword}の検索結果: ({totalCount || 0}件)
                            </h2>
                            <PageSizeSelect
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                            />
                        </Box>
                        {sentences.map((sentence) => (
                            <SentenceCard
                                key={sentence.id}
                                sentence={sentence}
                            />
                        ))}
                        <Pagination
                            total={totalCount}
                            pageSize={pageSize}
                            page={page}
                            setPage={setPage}
                        />
                    </>
                )}
            </Box>
        </>
    );
}
