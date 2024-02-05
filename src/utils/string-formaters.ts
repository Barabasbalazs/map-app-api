function replaceOnePatternWithAnother(text: string, pattern: string, replacement: string) {
    return text.replace(new RegExp(pattern, "g"), replacement);
}

export function replaceSlashesWithDots(text: string) {
  return replaceOnePatternWithAnother(text, "/", ".");
}