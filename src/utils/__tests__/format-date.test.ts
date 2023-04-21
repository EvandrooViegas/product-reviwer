import { describe, expect } from '@jest/globals';
import formatDate from "../format-date"
describe("testing a function that formats dates", () => {
    it("should format date correctly", () => {
        expect(formatDate("2023-04-07T17:34:26Z"))
         .toBe("7 de Abril de 2023")
    })
})