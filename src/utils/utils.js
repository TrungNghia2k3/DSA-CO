/**
 * Converts snake_case to Capitalized Words
 * Example: sorting_algorithms => Sorting Algorithms
 */
export const formatTitle = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export const capitalize = (word) => {
    if (!word || typeof word !== 'string') return '';
    return word
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const sortAlphabetically = (array) => {
    return [...array].sort((a, b) => {
        const aStr = typeof a === 'string' ? a : a.name;
        const bStr = typeof b === 'string' ? b : b.name;
        return aStr.localeCompare(bStr);
    });
};


