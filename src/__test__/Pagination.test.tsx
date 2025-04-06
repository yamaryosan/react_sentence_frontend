import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Pagination from "@/component/Pagination";

describe("Pagination", () => {
    it("renders pagination at first page", () => {
        render(
            <Pagination total={100} pageSize={10} page={1} setPage={() => {}} />
        );
        // 0, 11はなく、1〜5(最初の5ページ)が表示されており、6〜10は表示されていない
        expect(screen.queryByText("0")).not.toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.queryByText("6")).not.toBeInTheDocument();
        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.queryByText("8")).not.toBeInTheDocument();
        expect(screen.queryByText("9")).not.toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.queryByText("11")).not.toBeInTheDocument();
    });

    it("renders pagination at last page", () => {
        render(
            <Pagination
                total={100}
                pageSize={10}
                page={10}
                setPage={() => {}}
            />
        );
        // 0, 11はなく、1と6〜10(最後の5ページ)が表示されており、2〜5は表示されていない
        expect(screen.queryByText("0")).not.toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.queryByText("2")).not.toBeInTheDocument();
        expect(screen.queryByText("3")).not.toBeInTheDocument();
        expect(screen.queryByText("4")).not.toBeInTheDocument();
        expect(screen.queryByText("5")).not.toBeInTheDocument();
        expect(screen.getByText("6")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument();
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.queryByText("11")).not.toBeInTheDocument();
    });

    it("renders pagination at middle page", () => {
        render(
            <Pagination total={100} pageSize={10} page={5} setPage={() => {}} />
        );
        // 0, 11はなく、1, 10, そして5の前後のページが表示されており、それ以外は表示されていない
        expect(screen.queryByText("0")).not.toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.queryByText("2")).not.toBeInTheDocument();
        expect(screen.queryByText("3")).not.toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("6")).toBeInTheDocument();
        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.queryByText("8")).not.toBeInTheDocument();
        expect(screen.queryByText("9")).not.toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.queryByText("11")).not.toBeInTheDocument();
    });
});
