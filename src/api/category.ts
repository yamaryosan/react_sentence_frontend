/**
 * カテゴリー一覧を取得する
 * @returns string[] カテゴリー一覧
 */
export async function fetchCategories() {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles/categories`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('カテゴリーの取得に失敗しました');
        }
        const categories = await response.json() as string[];
        return categories;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}