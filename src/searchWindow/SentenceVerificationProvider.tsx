import ArticleSearchWindow from "@/searchWindow/ArticleSearchWindow";
import SentenceSearchWindow from "@/searchWindow/SentenceSearchWindow";
import { fetchSentenceVerification } from "@/api/verify";
import { useEffect, useState } from "react";
import SentenceVerificationContext from "@/searchWindow/SentenceVerificationContext";

/**
 * 記事検索ウィンドウと文章検索ウィンドウを提供するコンポーネント
 * 文章検索ウィンドウは認証済みの場合のみ表示される
 */
export default function SentenceVerificationProvider() {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const isVerified = await fetchSentenceVerification();
            setIsVerified(isVerified ?? false);
        }
        fetchData();
    }, []);

    return (
        <SentenceVerificationContext.Provider value={isVerified}>
            <ArticleSearchWindow />
            {isVerified && <SentenceSearchWindow />}
        </SentenceVerificationContext.Provider>
    )
}