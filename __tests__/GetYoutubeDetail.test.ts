const {getYoutubeDetail} = require("../src/common/getYoutubeDetail")

describe("Get Youtube Detail Function", () => {
    it("should return valid data when the input is a valid youtube Id",async () =>{
        const data = await getYoutubeDetail("jjHZf3-meB0")
        expect(data.title).toBeTruthy()
        expect(data.description).toBeTruthy()
    })
    it("should return null when the input is an invalid youtube Id",async () =>{
        const data = await getYoutubeDetail("123456")
        expect(data === null).toBeTruthy()
    })
})