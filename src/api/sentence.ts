type Sentence = {
    id: number,
    sentence: string,
}

/**
 * キーワードに応じて文章を取得
 * @param keyword キーワード
 */
export async function fetchSentences(keyword: string) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/sentences/search?keyword=${keyword}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const sentences = await response.json() as Sentence[];
        return sentences;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}