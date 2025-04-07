type CategoryWithCount = {
    category: string;
    count: number;
};

/**
 * カテゴリー一覧を取得する
 * @returns CategoryWithCount[] カテゴリー一覧
 */
export async function fetchCategories(): Promise<CategoryWithCount[]> {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/articles/categories`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("カテゴリーの取得に失敗しました");
        }
        const categories = (await response.json()) as CategoryWithCount[];
        return categories;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        return [];
    }
}
