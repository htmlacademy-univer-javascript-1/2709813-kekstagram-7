// 1. Проверка длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// 2. Проверка на палиндром
const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replaceAll(' ', '');
  const reversed = normalized.split('').reverse().join('');

  return normalized === reversed;
};

// 3. Извлечение цифр
const extractDigits = (input) => {
  const digits = String(input).match(/\d/g);

  return digits ? parseInt(digits.join(''), 10) : NaN;
};

void checkStringLength;
void isPalindrome;
void extractDigits;
