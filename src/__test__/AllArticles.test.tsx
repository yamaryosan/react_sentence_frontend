import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import AllArticles from "@/AllArticles";
import { fetchAllArticles } from "@/api/article";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
};

// fetchAllArticlesのモック
jest.mock("@/api/article", () => ({
    fetchAllArticles: jest.fn(),
}));

jest.mock("@/component/ArticleCard", () => ({
    __esModule: true,
    default: ({ article }: { article: Article }) => <div>{article.title}</div>,
}));

jest.mock("@/component/Pagination", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("@/component/PageSizeSelect", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("AllArticles", () => {
    const mockArticles = [
        { id: 1, title: "記事1", content: "内容1", category: "カテゴリ1" },
        { id: 2, title: "記事2", content: "内容2", category: "カテゴリ2" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        window.scrollTo = jest.fn();
    });

    it("renders loading state initially", () => {
        render(
            <DeviceTypeContext.Provider value="desktop">
                <AllArticles />
            </DeviceTypeContext.Provider>
        );
        expect(screen.getByText("読み込み中...")).toBeInTheDocument();
    });

    it("renders error message on fetch failure", async () => {
        (fetchAllArticles as jest.Mock).mockRejectedValue(
            new Error("Fetch error")
        );

        render(
            <DeviceTypeContext.Provider value="desktop">
                <AllArticles />
            </DeviceTypeContext.Provider>
        );

        await waitFor(() => {
            expect(
                screen.getByText("読み込みに失敗しました")
            ).toBeInTheDocument();
        });
    });

    it("renders articles correctly", async () => {
        (fetchAllArticles as jest.Mock).mockResolvedValue({
            articles: mockArticles,
            totalCount: 2,
        });

        render(
            <DeviceTypeContext.Provider value="desktop">
                <AllArticles />
            </DeviceTypeContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("記事1")).toBeInTheDocument();
        });
    });

    it("renders no articles message when there are no articles", async () => {
        (fetchAllArticles as jest.Mock).mockResolvedValue({
            articles: [],
            totalCount: 0,
        });

        render(
            <DeviceTypeContext.Provider value="desktop">
                <AllArticles />
            </DeviceTypeContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("記事がありません")).toBeInTheDocument();
        });
    });
});
