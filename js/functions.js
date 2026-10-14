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

// 4. Проверка укладывается ли встреча в рабочий день
const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const checkMeetingTime = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {
  const startWorkMinutes = convertTimeToMinutes(workDayStart);
  const endWorkMinutes = convertTimeToMinutes(workDayEnd);
  const startMeetingMinutes = convertTimeToMinutes(meetingStart);
  const endMeetingMinutes = startMeetingMinutes + meetingDuration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};
