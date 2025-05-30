/**
 * Produce timestamps at this time in milliseconds.
 * @returns {string} - Timestamp is currently a string.
 */
export function generateCurrentTimestamp(): string {
  return Date.now().toString();
}

/**
 * Convert millisecond timestamp to the date object.
 * @param {string} timestamp - Timestamp in milliseconds.
 * @returns {Date} - Objek Date.
 */
export function convertTimestampToDate(timestamp: string): Date {
  return new Date(Number(timestamp));
}

/**
 * Convert millisecond timestamp to the format 'DD MMM Yyyy, HH: MM'.
 * @param {string | number} timestamp - Timestamp in milliseconds.
 * @returns {string} - Formatted date.
 */
export function formatTimestampCompact(timestamp: string | number): string {
  const date = new Date(Number(timestamp));
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: false,
    })
    .replace(",", "");
}

/**
 * Produce a date string with a certain format.
 * @param {Date} date - Date object to be formatted.
 * @param {string} format - Date format (example: 'Yyyy-MM-DD').
 * @returns {string} - Date in a specified format.
 */
export function formatDate(date: Date, format: string): string {
  const options: { [key: string]: number | string } = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("id-ID", options).split("/");
  return format
    .replace("YYYY", formattedDate[2])
    .replace("MM", formattedDate[1])
    .replace("DD", formattedDate[0]);
}

/**
 * Calculate the time difference between two timestamps.
 * @param {string} start - Early timestamp.
 * @param {string} end - Final timestamp.
 * @returns {number} - Difference in time in milliseconds.
 */
export function calculateTimeDifference(start: string, end: string): number {
  return Number(end) - Number(start);
}

/**
 * Convert time difference in millisecond to the clock format: minutes: seconds.
 * @param {number} millis - Difference in time in milliseconds.
 * @returns {string} - Difference in time in 'HH: MM: SS' format.
 */
export function millisToTimeFormat(millis: number): string {
  const seconds = Math.floor((millis / 1000) % 60);
  const minutes = Math.floor((millis / (1000 * 60)) % 60);
  const hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}
