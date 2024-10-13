import ArticleSearchWindow from "./ArticleSearchWindow";
import SentenceSearchWindow from "../header/SentenceSearchWindow";
import { fetchVerification } from "@/api/verify";
import { useEffect, useState } from "react";
import VerificationContext from "@/header/VerificationContext";

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
            <SentenceSearchWindow />
        </VerificationContext.Provider>
    )
}