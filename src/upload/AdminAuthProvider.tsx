import { useState } from "react";
import UploadForm from "@/upload/UploadForm";
import AdminInputForm from "@/upload/AdminInputForm";
import SentenceSearchWindow from "@/searchWindow/SentenceSearchWindow";
/**
 * 管理者認証の確認プロバイダ
 * 未認証の場合、パスワード入力画面を表示する
 * 認証済の場合、アップロードフォームを表示する
 */
export default function AdminAuthProvider() {
    const [isVerified, setIsVerified] = useState(false);

    return (
        <>
            {isVerified ? (
                <>
                    <SentenceSearchWindow />
                    <UploadForm />
                </>
            ) : (
                <AdminInputForm setIsVerified={setIsVerified} />
            )}
        </>
    );
}
