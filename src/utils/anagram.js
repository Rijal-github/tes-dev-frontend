export const isAnagram = (str1, str2) => {
    const normalize = (str) =>
        str
            .toLowerCase()
            .replace(/\s+/g, "")
            .split("")
            .sort()
            .join("");
    
    return normalize(str1) === normalize(str2);
};