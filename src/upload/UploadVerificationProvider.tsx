import { useEffect, useState } from "react";
import { fetchUploadVerification } from "@/api/verify";
import UploadVerificationContext from "@/upload/UploadVerificationContext";
import UploadForm from "@/upload/UploadForm";
import ContactForm from "@/upload/ContactForm";

/**
 * アップロードフォームの認証確認プロバイダ
 * 未認証の場合、連絡先フォームを表示する
 * 認証済の場合、アップロードフォームを表示する
 */
export default function UploadVerificationProvider() {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const isVerified = await fetchUploadVerification();
            console.log(isVerified);
            setIsVerified(isVerified ?? false);
        }
        fetchData();

        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <UploadVerificationContext.Provider value={isVerified}>
            {isVerified ? <UploadForm /> : <ContactForm />}
        </UploadVerificationContext.Provider>
    )
}