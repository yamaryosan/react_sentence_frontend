import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";
import fetchHomeContent from "@/api/homeContent";

type Content = {
    body: string;
};

/**
 * ホーム画面のコンテンツを表示
 */
export default function HomeContent() {
    const { data: content, error } = useQuery<Content | undefined>(
        "home",
        fetchHomeContent
    );

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <div>
            <ReactMarkdown>{content?.body}</ReactMarkdown>
        </div>
    );
}
