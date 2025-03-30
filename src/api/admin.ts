/**
 * 管理者認証を行う
 * @param password パスワード
 * @returns 認証結果
 */
export async function fetchAdminAuth(
    password: string
): Promise<boolean | undefined> {
    try {
        if (password === "") {
            throw new Error("パスワードが空です");
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/admin?password=${password}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("お問い合わせの送信に失敗しました");
        }
        const result = await response.json();
        return result.isVerified;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
