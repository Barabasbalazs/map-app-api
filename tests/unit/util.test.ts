import { replaceSlashesWithDots } from "../../src/utils/string-formaters";
import { expect, test, describe } from "@jest/globals";

describe("Testing removeSlashesandBackTicksFromString util function", () => {
  test("Should remove all slashes from a string", () => {
    const result = replaceSlashesWithDots("//hello/ /world/");
    expect(result).toBe("..hello. .world.");
  });
});
