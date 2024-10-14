type Content = {
    body: string
};

/**
 * ホーム画面に表示する内容を取得
 * @returns Content ホーム画面に表示する内容
 */
export default async function fetchHomeContent() {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/home`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('内容の取得に失敗しました');
        }
        const content = await response.json() as Content
        return content;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};