const {shareVideo} = require("../src/common/shareVideo");
const axios = require("axios");

jest.mock("axios");

describe('Share Video Function', () => {
    beforeAll(() => {

    })
    beforeEach(() => {
    });

    afterEach(() => {
    });
    it("should throw an error when there's no video URL in input", async () => {
        try {
            await shareVideo("    ")
        }catch (e:any) {
            expect(e.message === "Please provide a video URL").toBeTruthy()
        }
    })
    it("shouldn't return error after calling share video api", async () => {
        axios.post.mockResolvedValue(Promise.resolve("ok"))
        try {
            await shareVideo("https://www.youtube.com/watch?v=Zy0y_gnyeJY");
        } catch (e) {
            expect(e).toBeFalsy()
        }
    })
})