import ArticleSearchWindow from "@/searchWindow/ArticleSearchWindow";
import SentenceSearchWindow from "@/searchWindow/SentenceSearchWindow";
import { fetchVerification } from "@/api/verify";
import { useEffect, useState } from "react";
import VerificationContext from "@/header/VerificationContext";

/**
 * 記事検索ウィンドウと文章検索ウィンドウを提供するコンポーネント
 * 文章検索ウィンドウは認証済みの場合のみ表示される
 */
export default function VerificationProvider() {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const isVerified = await fetchVerification();
            setIsVerified(isVerified ?? false);
        }
        fetchData();
    }, []);

    return (
        <VerificationContext.Provider value={isVerified}>
            <ArticleSearchWindow />
            {isVerified && <SentenceSearchWindow />}
        </VerificationContext.Provider>
    )
}