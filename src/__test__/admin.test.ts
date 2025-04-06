import "@testing-library/jest-dom";

import { fetchAdminAuth } from "@/api/admin";
import { setupJest } from "../../setupJest";
// @ts-ignore
import fetchMock from "jest-fetch-mock";

setupJest();
describe("admin", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("returns true if password is correct", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ isVerified: true }));

        const result = await fetchAdminAuth("correct");
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining("/admin?password=correct"),
            expect.objectContaining({
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        );
        expect(result).toBe(true);
    });

    it("returns false if password is incorrect", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ isVerified: false }));
        const result = await fetchAdminAuth("incorrect");
        expect(result).toBe(false);
    });
});
