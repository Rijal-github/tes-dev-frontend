export const isPalindrome = (text) => {
    const normalized = text.toLowerCase();
    const reversed = normalized.split("").reverse().join("");
    return normalized === reversed;
}