export const getEvenNumbers = (numbers) => {
    return numbers.filter((num) => num % 2 === 0);
}

export const sumEvenNumbers = (numbers) => {
    return numbers
    .filter((num) => num % 2 === 0)
    .reduce((total, num) => total + num ,0);
}