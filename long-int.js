/*
    Объект LongInt содержит поле sign (знак числа) и array - массив цифр числа, записанный в обратном порядке.
    Запись в обратном порядке нужна, чтобы упростить реализацию сложения и вычитания.
*/

class LongInt {
    constructor(sign, array) {
        this.array = ArrayOperations.trimRightZeros(array);
        if (array.length == 1 && array[0] == 0) {       // Проверка нужна, чтобы не было -0: иначе нуль не представляется в единственном виде
            this.sign = "+";
        } else {
            this.sign = sign;
        }
    }

    length() {
        return this.array.length;
    }

    toString() {
        return (this.sign == "+" ? "" : "-") + [...this.array].reverse().join("");
    }

    static fromString(str) {
        let tempStr =
            str.startsWith("-") || str.startsWith("+") ? str.substring(1) : str;
        let array = Array.from(tempStr, (ch) => parseInt(ch)).reverse();

        let sign = str.startsWith("-") ? "-" : "+";

        return new LongInt(sign, array);
    }

    static add(longInt1, longInt2) {
        if (longInt1.sign == longInt2.sign) {
            let resultSign = longInt1.sign;
            let resultArray = ArrayOperations.add(longInt1.array, longInt2.array);

            return new LongInt(resultSign, resultArray);
        } else {
            let temp = ArrayOperations.compare(longInt1.array, longInt2.array);
            if (temp == 0) return new LongInt("+", [0]);

            if (temp == 1) {
                return new LongInt(
                    longInt1.sign,
                    ArrayOperations.substract(longInt1.array, longInt2.array)
                );
            } else {
                return new LongInt(
                    longInt2.sign,
                    ArrayOperations.substract(longInt2.array, longInt1.array)
                );
            }
        }
    }

    static substruct(longInt1, longInt2) {
        if (
            (longInt1.sign == "+" && longInt2.sign == "-") ||
            (longInt1.sign == "-" && longInt2.sign == "+")
        ) {
            return new LongInt(
                longInt1.sign,
                ArrayOperations.add(longInt1.array, longInt2.array)
            );
        } else {
            let temp = ArrayOperations.compare(longInt1.array, longInt2.array);
            if (temp == 0) return new LongInt("+", [0]);

            if (temp == 1) {
                return new LongInt(
                    longInt1.sign,
                    ArrayOperations.substract(longInt1.array, longInt2.array)
                );
            } else {
                let sign = longInt1.sign == "+" ? "-" : "+";
                return new LongInt(
                    sign,
                    ArrayOperations.substract(longInt2.array, longInt1.array)
                );
            }
        }
    }

    static multiply(longInt1, longInt2) {
        let resultSign = longInt1.sign == longInt2.sign ? "+" : "-";
        return new LongInt(
            resultSign,
            ArrayOperations.multiply(longInt1.array, longInt2.array)
        );
    }

    static divide(longInt1, longInt2) {
        let resultSign = longInt1.sign == longInt2.sign ? "+" : "-";
        return new LongInt(
            resultSign,
            ArrayOperations.divide(longInt1.array, longInt2.array)
        );
    }
}

class ArrayOperations {
    static add(array1, array2) {
        let result = [];
        let maxLength = Math.max(array1.length, array2.length);
        let reminder = 0;

        for (let i = 0; i < maxLength; i++) {
            let num1 = array1[i] ? array1[i] : 0;
            let num2 = array2[i] ? array2[i] : 0;

            result[i] = (num1 + num2 + reminder) % 10;
            reminder = Math.floor((num1 + num2 + reminder) / 10);
        }

        if (reminder != 0) {
            result[maxLength] = reminder;
        }

        return result;
    }

    static substract(array1, array2) {
        let result = [];
        let reminder = 0;

        for (let i = 0; i < array1.length; i++) {
            let num1 = array1[i];
            let num2 = array2[i] ? array2[i] : 0;
            let tmp = num1 - num2 - reminder;
            if (tmp < 0) {
                tmp += 10;
                reminder = 1;
            } else {
                reminder = 0;
            }
            result[i] = tmp;
        }

        return result;
    }

    /* 
        Использует алгоритм умножения Карацубы
    */

    static multiply(array1, array2) {
        if (array1.length == 1 || array2.length == 1) {
            if (array1[array1.length - 1] == 0 || array2[array2.length - 1] == 0)
                return [0];

            let result = null;
            if (array1.length < array2.length) {
                result = ArrayOperations.multiplyByNumber(
                    array2,
                    array1[array1.length - 1]
                );
            } else {
                result = ArrayOperations.multiplyByNumber(
                    array1,
                    array2[array2.length - 1]
                );
            }
            return result;
        } else {
            let r = 0;
            if (array1.length < array2.length) {
                // В случае, если массивы разной длины,
                r = array2.length - array1.length; // меньший из массивов дополняется нулями слева.
                array1 = ArrayOperations.multiplyByPowerOf10(array1, r);
            } else if (array2.length < array1.length) {
                r = array1.length - array2.length;
                array2 = ArrayOperations.multiplyByPowerOf10(array2, r);
            }

            let m = Math.floor(array1.length / 2);

            let a = array1.slice(m);
            let b = array1.slice(0, m);
            let c = array2.slice(m);
            let d = array2.slice(0, m);

            let tmp1 = ArrayOperations.multiply(a, c);
            let tmp2 = ArrayOperations.multiply(b, d);
            let tmp3 = ArrayOperations.multiply(
                ArrayOperations.add(a, b),
                ArrayOperations.add(c, d)
            );
            let tmp4 = ArrayOperations.substract(
                tmp3,
                ArrayOperations.add(tmp1, tmp2)
            );

            let result = ArrayOperations.add(
                ArrayOperations.add(
                    ArrayOperations.multiplyByPowerOf10(tmp1, 2 * m),
                    ArrayOperations.multiplyByPowerOf10(tmp4, m)
                ),
                tmp2
            );

            result = ArrayOperations.trimRightZeros(result.slice(r)); // Обрезаются лишние нули
            return result;
        }
    }

    static trimRightZeros(array) {
        for (let i = array.length - 1; i > 0; i--) {
            if (array[i] == 0) {
                array.pop();
            } else {
                break;
            }
        }
        return array;
    }

    static multiplyByPowerOf10(array, pow) {
        let result = array.slice();
        for (let i = 0; i < pow; i++) {
            result.unshift(0);
        }
        return result;
    }

    static multiplyByNumber(array1, num) {
        let result = [];
        let reminder = 0;
        for (let i = 0; i < array1.length; i++) {
            result[i] = (array1[i] * num + reminder) % 10;
            reminder = Math.floor((array1[i] * num + reminder) / 10);
        }
        if (reminder != 0) {
            result[array1.length] = reminder;
        }
        return result;
    }

    /*
        Возвращает 1, если число в массиве больше, -1 - если меньше, 0 - если равно
    */

    static compare(array1, array2) {
        if (array1.length > array2.length) {
            return 1;
        } else if (array1.length < array2.length) {
            return -1;
        }
        for (let i = array1.length - 1; i >= 0; i--) {
            if (array1[i] > array2[i]) return 1;
            if (array1[i] < array2[i]) return -1;
        }
        return 0;
    }

    /*
        Делит нацело уголком
    */

    static divide(array1, array2) {
        if (ArrayOperations.compare(array2, array1) == 0) return [1];
        else if (ArrayOperations.compare(array2, array1) == 1) return [0];

        let len1 = array1.length;
        let len2 = array2.length;

        let resultArray = [];

        let pos = len1 - len2;
        let reminder = array1.slice(pos);

        if (ArrayOperations.compare(array2, reminder) == 1) {
            pos = len1 - len2 - 1;
            reminder = array1.slice(pos);
        }

        let temp = array2;

        while (pos > -1) {
            temp = array2;

            let resultValue = 0;

            while (ArrayOperations.compare(reminder, temp) >= 0) {
                resultValue++;
                temp = ArrayOperations.multiplyByNumber(array2, resultValue);
            }
            if (resultValue > 0) resultValue--;

            resultArray.unshift(resultValue);

            pos--;
            if (pos > -1) {
                reminder = ArrayOperations.trimRightZeros(
                    ArrayOperations.substract(
                        reminder,
                        ArrayOperations.multiplyByNumber(array2, resultValue)
                    )
                );
                reminder.unshift(array1[pos]);
            }
        }
        return resultArray;
    }
}

export { LongInt };