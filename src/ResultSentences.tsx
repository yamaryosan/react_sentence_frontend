import { useQuery } from 'react-query';
import Box from "@mui/material/Box";
import { useParams } from 'react-router-dom';


type Sentence = {
    id: number;
    sentence: string;
};

type Sentences = Sentence[];

const fetchSentences = async (keyword: string): Promise<Sentences> => {
    const response = await fetch(`http://localhost/sentences/search?keyword=${keyword}`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json();
};

export default function ResultSentences() {

    // URLパラメータからキーワードを取得
    const { keyword } = useParams<{ keyword: string }>();
    // 記事を取得
    const { data: sentences, isLoading, error } = useQuery<Sentences>(['sentences', keyword], () => fetchSentences(keyword || ''));

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box sx={{
            textAlign: 'left',
            }}>
                {sentences?.length === 0 ? (
                    <p>{keyword}の検索結果: ヒットなし</p>
                ) : (
                    sentences?.map((sentence) => (
                        <div key={sentence.id}>
                            <p>{sentence.sentence}</p>
                        </div>
                    ))
                )}
        </Box>
    );
}