import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactMarkdown from 'react-markdown';

type Article = {
    body: string
};

const fetchArticle = async (): Promise<Article> => {
    const response = await fetch(`http://localhost/api/home`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
    }
    return response.json();
};

export default function HomeContent() {
    // URLパラメータからキーワードを取得
    const { keyword } = useParams<{ keyword: string }>();
    // 記事を取得
    const { data: article, error } = useQuery<Article>('article', fetchArticle);

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <div>
            <ReactMarkdown>
                {article?.body}
            </ReactMarkdown>
        </div>
    );
}