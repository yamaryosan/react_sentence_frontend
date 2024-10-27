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
 * @param page ページ番号
 * @param pageSize ページサイズ
 * @returns Article[] 記事一覧
 */
export async function fetchAllArticles(page: number, pageSize: number) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles?page=${page}&pageSize=${pageSize}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const articles = await response.json() as {articles: Article[], totalCount: number};
        return { articles: articles.articles, totalCount: articles.totalCount };
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
 * @param page ページ番号
 * @param pageSize ページサイズ
 * @returns Article[] 記事一覧
 */
export async function fetchArticles(keyword: string, page: number, pageSize: number) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/articles/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const articles = await response.json() as {articles: Article[], totalCount: number};
        return { articles: articles.articles, totalCount: articles.totalCount };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

/**
 * カテゴリーで記事を取得
 * @param category カテゴリー名
 * @param page ページ番号
 * @param pageSize ページサイズ
 * @returns Article[] 記事一覧
 */
export async function fetchArticlesByCategory(category: string, page: number, pageSize: number) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles/categories/${category}?page=${page}&pageSize=${pageSize}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const articles = await response.json() as {articles: Article[], totalCount: number};
        return { articles: articles.articles, totalCount: articles.totalCount };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

/**
 * 複数ファイルのアップロード処理
 * @param files アップロードするファイルの配列
 * @returns アップロード結果
 */
export async function fetchUpload(files: File[]) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();

    files.forEach((file) => {
        /* 拡張子が.mdでないファイルは処理をスキップ */
        if (!file.name.endsWith('.md')) {
            return;
        }
        formData.append('files[]', file);
        /* ファイルの親フォルダの1つ内側のフォルダ名を取得 */
        const pathSegments = file.webkitRelativePath.split('/');
        const category = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : 'default';
        formData.append('categories[]', category);
    });

    const response = await fetch(`${apiUrl}/api/articles/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('アップロードに失敗しました');
    }
    return await response.json() as {message: string};
}