import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import PageSizeSelect from "@/component/PageSizeSelect";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";

describe("PageSizeSelect", () => {
    it("renders page size select", () => {
        // 50, 100, 200, 500のページサイズのみ許可される
        for (const pageSize of [50, 100, 200, 500]) {
            render(
                <DeviceTypeContext.Provider value="desktop">
                    <PageSizeSelect
                        pageSize={pageSize}
                        setPageSize={() => {}}
                    />
                </DeviceTypeContext.Provider>
            );
            expect(screen.getByText(pageSize)).toBeInTheDocument();
        }
    });

    it("not renders page size select if page size is wrong", () => {
        render(
            <DeviceTypeContext.Provider value="desktop">
                <PageSizeSelect pageSize={3} setPageSize={() => {}} />
            </DeviceTypeContext.Provider>
        );
        expect(screen.queryByText("3")).not.toBeInTheDocument();
    });

    it("renders page size select with mobile", () => {
        render(
            <DeviceTypeContext.Provider value="mobile">
                <PageSizeSelect pageSize={50} setPageSize={() => {}} />
            </DeviceTypeContext.Provider>
        );
        expect(screen.getByText("50")).toBeInTheDocument();
    });
});
