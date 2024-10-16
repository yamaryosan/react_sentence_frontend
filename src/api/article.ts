type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
    created_at: string;
    updated_at: string;
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

/**
 * IDに応じて記事を取得
 * @param id 記事ID
 */
export async function fetchArticleById(id: number) {
    try {
        if (!id) {
            throw new Error('IDが不正です');
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles/${id}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事が見つかりません');
        }
        const article = await response.json() as Article;
        return article;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

/**
 * キーワードに応じて記事を取得
 * @param keyword キーワード
 */
export async function fetchArticles(keyword: string) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/articles/search?keyword=${keyword}`, {
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
}

/**
 * カテゴリーで記事を取得
 * @param category カテゴリー名
 * @returns 
 */
export async function fetchArticlesByCategory(category: string) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles/categories/${category}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const articles = await response.json() as Promise<Article[]>;
        return articles;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}