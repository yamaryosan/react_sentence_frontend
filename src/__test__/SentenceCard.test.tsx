import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import SentenceCard from "@/component/SentenceCard";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { BrowserRouter } from "react-router-dom";
describe("SentenceCard", () => {
    const mockSentences = [
        { id: 1, sentence: "文章1" },
        { id: 2, sentence: "文章2" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders sentence", () => {
        render(
            <BrowserRouter>
                <DeviceTypeContext.Provider value="desktop">
                    <SentenceCard sentence={mockSentences[0]} />
                </DeviceTypeContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText("文章1")).toBeInTheDocument();
    });
});
