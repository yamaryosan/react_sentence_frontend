import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ResultArticles from "./ResultArticles";
import ResultSecret from "./ResultSecret";

type Article = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

type ResponseData = {
    articles: Article[];
    specificKeyword?: string;
};

const fetchResponse = async (keyword: string): Promise<ResponseData> => {
    if (!keyword) {
        throw new Error('キーワードが不正です');
    }
    const response = await fetch(`http://localhost/api/search?keyword=${keyword}`);
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json();
};

export default function GeneralResult() {

    const params = useParams<{keyword: string}>();

    const {data, isLoading, isError} = useQuery<ResponseData, Error>(
        ['article', params.keyword],
        () => fetchResponse(params.keyword ?? ''),
    );

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <div>
            {(data?.specificKeyword ? <ResultSecret /> : <ResultArticles articles={data?.articles} />)}
        </div>
    );
}