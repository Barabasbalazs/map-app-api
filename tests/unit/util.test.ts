import { formatValidationErrorMessage } from "../../src/utils/string-formaters";
import { expect, test, describe } from "vitest";

describe("Testing removeSlashesandBackTicksFromString util function", () => {
  test("Should remove all slashes from a string", () => {
    const result = formatValidationErrorMessage("//hello/ /world/");
    expect(result).toBe("..hello. .world.");
  });
  test("If error message contains any reference to schema structure it should be removed", () => {
    const bodyResult = formatValidationErrorMessage("body/email must match format 'email'");
    expect(bodyResult).toBe("email must match format 'email'");
    const queryStringResult = formatValidationErrorMessage("queryString/email must match format 'email'");
    expect(queryStringResult).toBe("email must match format 'email'");
    const paramsResult = formatValidationErrorMessage("params/email must match format 'email'");
    expect(paramsResult).toBe("email must match format 'email'");
  });
});
