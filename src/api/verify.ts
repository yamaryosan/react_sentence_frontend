type VerificationResponse = {
    isVerified: string;
}

/**
 * 文章検索ウィンドウの認証確認
 * @returns 認証済みの場合true, 未認証の場合false, エラーの場合undefined
 */
export async function fetchSentenceVerification(): Promise<boolean | undefined> {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/sentenceVerify`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('認証情報の取得に失敗しました');
        }
        const result = await response.json() as VerificationResponse;
        const isVerified = result.isVerified === "true" ? true : false;
        return isVerified;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

/**
 * アップロードフォームの認証確認
 * @returns 認証済みの場合true, 未認証の場合false, エラーの場合undefined
 */
export async function fetchUploadVerification(): Promise<boolean | undefined> {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/uploadVerify`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('認証情報の取得に失敗しました');
        }
        const result = await response.json() as VerificationResponse;
        const isVerified = result.isVerified === "true" ? true : false;
        return isVerified;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}