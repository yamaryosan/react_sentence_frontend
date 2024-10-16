/**
 * カテゴリー一覧を取得する
 * @returns string[] カテゴリー一覧
 */
export async function fetchCategories() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/articles/categories`);

    if (!response.ok) {
        throw new Error('カテゴリの取得に失敗しました');
    }
    return await response.json() as string[];
}