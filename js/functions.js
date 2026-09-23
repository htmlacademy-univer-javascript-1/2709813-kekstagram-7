const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replaceAll(' ', '');
  const reversed = normalized.string?.split('').reverse().join('') || normalized.split('').reverse().join('');
  return normalized === reversed;
};

const extractDigits = (input) => {
  const digits = String(input).match(/\d/g);
  return digits ? parseInt(digits.join(''), 10) : NaN;
};
