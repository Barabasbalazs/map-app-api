function replaceOnePatternWithAnother(text: string, pattern: string, replacement: string) {
    return text.replace(new RegExp(pattern, "g"), replacement);
}

function replaceSlashesWithDots(text: string) {
  return replaceOnePatternWithAnother(text, "/", ".");
}

const schemaStructurePatterns = ["body.", "queryString.", "params."];

export function formatValidationErrorMessage(message: string) {
  const dotsErrorMessage = replaceSlashesWithDots(message);
  const patternsInString = schemaStructurePatterns.find((pattern) => dotsErrorMessage.includes(pattern));
  return patternsInString?.length ? dotsErrorMessage.replace(patternsInString,"") : dotsErrorMessage;
}