import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h2>404 Not Found</h2>
            <p>ページが見つかりませんでした。</p>
            <Link to="/">トップページへ戻る</Link>
        </>
    );
}
