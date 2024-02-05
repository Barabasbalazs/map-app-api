import { replaceSlashesWithDots } from "../../src/utils/string-formaters";
import { expect, it, describe } from "@jest/globals";

describe("Testing removeSlashesandBackTicksFromString util function", () => {
  it("Should remove all slashes from a string", () => {
    const result = replaceSlashesWithDots("//hello/ /world/");
    expect(result).toBe("..hello. .world.");
  });
});
