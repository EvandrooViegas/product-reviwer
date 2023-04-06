import getYoutubeVideoId from "../get-youtube-video-id"
import { describe, expect } from '@jest/globals';
describe("testing functions", () => {
    it("should return video id", () => {
        expect(getYoutubeVideoId("https://www.youtube.com/watch?v=JfRXqNZ39gs&t=72sdfsdfs=41#$23434dfsdsdfsdfsdfs"))
         .toBe("JfRXqNZ39gs")
    })
})