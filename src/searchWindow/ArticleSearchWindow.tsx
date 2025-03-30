import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchWindow from "@/searchWindow/SearchWindow";

export default function ArticleSearchWindow() {
    const [keyword, setKeyword] = useState<string>("");
    const navigate = useNavigate();

    /**
     * 値が空白でないことを確認して検索ページに遷移
     */
    const handleSubmit = () => {
        if (keyword === "") {
            return;
        }
        navigate("/articles/search/" + keyword);
    };

    return (
        <SearchWindow
            target="article"
            path="articles/search"
            setKeyword={setKeyword}
            handleSubmit={handleSubmit}
        />
    );
}
