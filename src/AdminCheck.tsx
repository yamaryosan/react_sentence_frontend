import { useQuery } from "react-query";
import SearchWindow from "./SearchWindow";

type isVerifiedResponse = {
    isVerified: string;
};

const fetchResponse = async (): Promise<isVerifiedResponse> => {
    const response = await fetch(`http://localhost/verify`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('認証情報の取得に失敗しました');
    }
    return response.json();
};

export default function AdminCheck() {
    // 認証情報を取得
    const { data: isVerified, error } = useQuery('isVerified', fetchResponse);

    // 認証結果によって表示を変更
    return (
        <div>
            {isVerified?.isVerified === 'true' ? (
                <div>
                    <h2>管理者メニュー</h2>
                    <p>管理者としてログインしています</p>
                    <p>{isVerified?.isVerified}</p>
                    <SearchWindow />
                </div>
            ) : (
                <div>
                    <h2>管理者メニュー</h2>
                    <p>管理者としてログインしていません</p>
                    <p>{isVerified?.isVerified}</p>
                    <SearchWindow />
                </div>
            )}
        </div>
    );
}