import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import ArticleCard from "@/component/ArticleCard";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { BrowserRouter } from "react-router-dom";
describe("ArticleCard", () => {
    const mockArticles = [
        { id: 1, title: "記事1", content: "内容1", category: "カテゴリ1" },
        { id: 2, title: "記事2", content: "内容2", category: "カテゴリ2" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        window.scrollTo = jest.fn();
    });

    it("renders article title", () => {
        render(
            <BrowserRouter>
                <DeviceTypeContext.Provider value="desktop">
                    <ArticleCard article={mockArticles[0]} />
                </DeviceTypeContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText("記事1")).toBeInTheDocument();
    });
});
