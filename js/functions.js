//Функция 1. Проверка длины строки
const checkingStringLength = (line = '', maxLength = 1) => line.length <= maxLength;

/* --Тестирование кода--
console.log(checkingStringLength('проверяемая строка', 20)); // true
console.log(checkingStringLength('проверяемая строка', 18)); // true
console.log(checkingStringLength('проверяемая строка', 10)); // false
*/

//Функция 2. Проверка на палиндром
const checkPalindrome = (line = '') => {
  const normalizeLine = line.replaceAll(' ', '').toLowerCase();
  let invertedLine = '';

  for(let i = normalizeLine.length - 1; i >= 0; i --){
    invertedLine += normalizeLine[i];
  }

  return normalizeLine === invertedLine;
};

/* --Тестирование кода--
.log(checkPalindrome('топот')); // true
console.log(checkPalindrome('ДовОд')); // true
console.log(checkPalindrome('Кекс')); // false
console.log(checkPalindrome('Лёша на полке клопа нашёл')); // true
*/

//Функция 3. Дополнительное задание
const getNumber = (line = '') => {

  line = line.toString();
  let resultingNumber = '';

  for (let i = 0; i < line.length; i ++) {
    if(!Number.isNaN(parseInt(line[i], 10))) {
      resultingNumber += line[i];
    }
  }

  return resultingNumber === '' ? NaN : Number(resultingNumber);
};

/* --Тестирование кода--
console.log(getNumber('2023 год')); // 2023
console.log(getNumber('ECMAScript 2022')); // 2022
console.log(getNumber('1 кефир, 0.5 батона')); // 105
console.log(getNumber('агент 007')); // 7
console.log(getNumber('а я томат')); // NaN
console.log(getNumber(2023)); // 2023
console.log(getNumber(-1)); // 1
console.log(getNumber(1.5)); // 15
*/
