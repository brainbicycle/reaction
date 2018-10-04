import { limitArrayOfStringsWithCount } from "../limitArrayOfStringsWithCount"

describe("limitArrayOfStringsWithCount", () => {
  it("returns empty array if no array of strings is given", () => {
    const limited = limitArrayOfStringsWithCount(null, 3)
    expect(limited).toEqual([])
  })

  it("returns initial array if limit number is more then elements in initial array", () => {
    const limited = limitArrayOfStringsWithCount(
      ["let", "there", "be", "light"],
      8
    )
    expect(limited).toEqual(["let", "there", "be", "light"])
  })

  it("returns initial array if limit number is same as elements in initial array", () => {
    const limited = limitArrayOfStringsWithCount(
      ["let", "there", "be", "light"],
      4
    )
    expect(limited).toEqual(["let", "there", "be", "light"])
  })

  it("returns limited array according to limit", () => {
    const limited = limitArrayOfStringsWithCount(
      ["let", "there", "be", "light"],
      2
    )
    expect(limited).toEqual(["let", "there", "+2 more"])
  })
})
