/**
 * Capitalizing the first letter of the string.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String with the first letter of capital.
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Combining several strings into one string with the initial letters of each capital word.
 * @param {...string} words - Some strings to be combined.
 * @returns {string} - A combined string with the initial letters of each capital word.
 */
export function combineAndCapitalize(...words: string[]): string {
  return words
    .join(" ") // Combine all strings into one
    .split(" ") // Divide the string into word array
    .map((word) => capitalizeFirstLetter(word)) // Retrialization of the first letter of each word
    .join(" "); // Reinstate into string
}

/**
 * Relating all letters in the string.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String with all capital letters.
 */
export function capitalizeAllLetters(string: string): string {
  return string.toUpperCase();
}

/**
 * Changing all letters in the string into smaller.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String with all lowercase letters.
 */
export function lowercaseAllLetters(string: string): string {
  return string.toLowerCase();
}

/**
 * Add a cross line to the string.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String with a cross line.
 */
export function strikethrough(string: string): string {
  return `~~${string}~~`;
}

/**
 * Add the bottom line to the string.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String with the bottom line.
 */
export function underline(string: string): string {
  return `__${string}__`;
}

/**
 * Delete all spaces from the string.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String without spaces.
 */
export function removeSpaces(string: string): string {
  return string.replace(/\s+/g, "");
}

/**
 * Reverse the sequence of characters in the string.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String that has been reversed.
 */
export function reverseString(string: string): string {
  return string.split("").reverse().join("");
}

/**
 * Relating the first letter of each word.
 * @param {string} string - String to be manipulated.
 * @returns {string} - String with the first letter of each capital word.
 */
export function capitalizeEachWord(string: string): string {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

/**
 * Count the number of words in the string.
 * @param {string} string - String to be counted.
 * @returns {number} - The number of words in the string.
 */
export function countWords(string: string): number {
  return string.trim().split(/\s+/).length;
}

/**
 * Change certain words in a string with new words.
 * @param {string} string - String to be manipulated.
 * @param {string} target - Words that will be replaced.
 * @param {string} replacement - Substitute word.
 * @returns {string} - String after replacement.
 */
export function replaceWord(
  string: string,
  target: string,
  replacement: string
): string {
  const regex = new RegExp(target, "gi");
  return string.replace(regex, replacement);
}

/**
 * Remove all the appearance of certain characters from the string.
 * @param {string} string - String to be manipulated.
 * @param {string} charToRemove - Character to be deleted.
 * @returns {string} -String without deleted characters.
 */
export function removeCharacter(string: string, charToRemove: string): string {
  const regex = new RegExp(charToRemove, "g");
  return string.replace(regex, "");
}

/**
 * Add prefix and suffix to the string.
 * @param {string} string - String to be manipulated.
 * @param {string} prefix -Prefix to be added.
 * @param {string} suffix -Suffix to be added.
 * @returns {string} - String with Prefix and Suffix.
 */
export function addPrefixSuffix(
  string: string,
  prefix: string,
  suffix: string
): string {
  return `${prefix}${string}${suffix}`;
}

/**
 * Change the string into a title case format.
 * @param {string} string - stringToBeManipulated
 * @returns {string} -String in format title case.
 */
export function toTitleCase(string: string): string {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}
