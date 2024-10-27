type Sentence = {
    sentence: string;
    id: number;
}

/**
 * キーワードに応じて文章を取得
 * @param keyword キーワード
 * @param page ページ番号
 * @param pageSize ページサイズ
 */
export async function fetchSentences(keyword: string, page: number, pageSize: number) {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/sentences/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        const result = await response.json() as {sentences: Sentence[], totalCount: number};
        return { sentences: result.sentences, totalCount: result.totalCount };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

/**
 * 文章ファイルのアップロード
 * @param file アップロードするファイル
 * @returns アップロード結果
 */
export async function fetchUpload(file: File) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${apiUrl}/api/sentences/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('アップロードに失敗しました');
    }
    return await response.json() as { message: string };
}