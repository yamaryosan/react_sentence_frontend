type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
};

/**
 * 記事一覧を取得
 * @returns Article[] 記事一覧
 */
export async function fetchAllArticles() {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const articles = await response.json() as Article[];
        return articles;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};

/**
 * ランダムに記事を取得
 * @returns Article[] ランダム記事
 */
export async function fetchRandomArticles() {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles/random`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事が見つかりません');
        }
        const articles = await response.json() as Article[];
        return articles;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}