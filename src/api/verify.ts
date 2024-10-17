type VerificationResponse = {
    isVerified: string;
}

export async function fetchVerification(): Promise<boolean | undefined> {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/verify`, {
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
