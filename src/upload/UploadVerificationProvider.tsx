import { useState } from "react";
import UploadForm from "@/upload/UploadForm";
import ContactForm from "@/upload/ContactForm";
import SentenceSearchWindow from "@/searchWindow/SentenceSearchWindow";
/**
 * アップロードフォームの認証確認プロバイダ
 * 未認証の場合、連絡先フォームを表示する
 * 認証済の場合、アップロードフォームを表示する
 */
export default function UploadVerificationProvider() {
    const [isVerified, setIsVerified] = useState(false);

    return (
        <>
            {isVerified ? (
                <>
                    <SentenceSearchWindow />
                    <UploadForm />
                </>
            ) : (
                <ContactForm setIsVerified={setIsVerified} />
            )}
        </>
    );
}
