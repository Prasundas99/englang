import { KEYWORDS, PUNCTUATION, SYMBOL_OPERATORS, TOKEN_TYPES } from "./constants/tokens.js";

export function tokenize(sourceCode) {
  const sourceText = String(sourceCode);
  const tokenList = [];
  let currentCharacterIndex = 0;

  while (currentCharacterIndex < sourceText.length) {
    const currentCharacter = sourceText[currentCharacterIndex];

    if (/\s/.test(currentCharacter)) {
      currentCharacterIndex++;
      continue;
    }

    if (PUNCTUATION[currentCharacter]) {
      tokenList.push({ type: PUNCTUATION[currentCharacter], value: currentCharacter });
      currentCharacterIndex++;
      continue;
    }

    // Two-character symbols must be checked before one-character symbols (>= before >).
    const twoCharacterSymbol = sourceText.slice(currentCharacterIndex, currentCharacterIndex + 2);
    if (SYMBOL_OPERATORS[twoCharacterSymbol]) {
      tokenList.push({ type: TOKEN_TYPES.SYMBOL_OPERATOR, value: twoCharacterSymbol });
      currentCharacterIndex += 2;
      continue;
    }

    if (SYMBOL_OPERATORS[currentCharacter]) {
      tokenList.push({ type: TOKEN_TYPES.SYMBOL_OPERATOR, value: currentCharacter });
      currentCharacterIndex++;
      continue;
    }

    if (currentCharacter === '"') {
      let stringLiteralValue = "";
      currentCharacterIndex++;

      while (currentCharacterIndex < sourceText.length && sourceText[currentCharacterIndex] !== '"') {
        stringLiteralValue += sourceText[currentCharacterIndex];
        currentCharacterIndex++;
      }

      if (currentCharacterIndex >= sourceText.length) {
        throw new Error("Unclosed string literal.");
      }

      tokenList.push({ type: TOKEN_TYPES.STRING, value: stringLiteralValue });
      currentCharacterIndex++;
      continue;
    }

    if (/[0-9]/.test(currentCharacter)) {
      let numberLiteralText = currentCharacter;
      let decimalPointAlreadyUsed = false;
      currentCharacterIndex++;

      while (currentCharacterIndex < sourceText.length) {
        const nextCharacter = sourceText[currentCharacterIndex];

        if (/[0-9]/.test(nextCharacter)) {
          numberLiteralText += nextCharacter;
          currentCharacterIndex++;
          continue;
        }

        // Keep '.' as part of number only if it is the first decimal point and followed by a digit.
        const decimalPointCanContinueNumber =
          nextCharacter === "." &&
          !decimalPointAlreadyUsed &&
          currentCharacterIndex + 1 < sourceText.length &&
          /[0-9]/.test(sourceText[currentCharacterIndex + 1]);

        if (decimalPointCanContinueNumber) {
          decimalPointAlreadyUsed = true;
          numberLiteralText += nextCharacter;
          currentCharacterIndex++;
          continue;
        }

        break;
      }

      tokenList.push({ type: TOKEN_TYPES.NUMBER, value: numberLiteralText });
      continue;
    }

    let wordText = currentCharacter;
    currentCharacterIndex++;

    while (currentCharacterIndex < sourceText.length) {
      const nextCharacter = sourceText[currentCharacterIndex];
      const stopOnWhitespace = /\s/.test(nextCharacter);
      const stopOnPunctuation = Boolean(PUNCTUATION[nextCharacter]);
      const stopOnQuote = nextCharacter === '"';

      if (stopOnWhitespace || stopOnPunctuation || stopOnQuote) {
        break;
      }

      wordText += nextCharacter;
      currentCharacterIndex++;
    }

    const lowerCaseWordText = wordText.toLowerCase();
    if (KEYWORDS[lowerCaseWordText]) {
      tokenList.push({ type: KEYWORDS[lowerCaseWordText], value: lowerCaseWordText });
      continue;
    }

    tokenList.push({ type: TOKEN_TYPES.IDENTIFIER, value: wordText });
  }

  return tokenList;
}
