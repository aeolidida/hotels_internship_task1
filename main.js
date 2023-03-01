import { capitalizeFirst, fixPunctuation, countWords, countUniqueWords } from "./string-functions.js";
import { LongInt } from "./long-int.js";
import { Product, ProductContainer } from "./product.js"

console.log("\n__Задача 1__\n");

console.log("capitalizeFirst()")
console.log('sdg GDS Gg :', capitalizeFirst('sdg GDS Gg'))
console.log('s :', capitalizeFirst('s'))
console.log(" :", capitalizeFirst(''))

console.log()

let testString1 = "Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены."
console.log("fixPunctuation()")
console.log(testString1)
console.log(fixPunctuation(testString1))

console.log()

let testString2 = "Текст, в котором слово текст несколько раз встречается и слово тоже"
console.log("countWords()")
console.log(testString2)
console.log("Слов в строке:", countWords(testString2))

console.log()

console.log("countUniqueWords()")
console.log(testString2)
console.log(countUniqueWords(testString2))

console.log("\n__Задача 2__\n");

let firstInt = LongInt.fromString("123123123123123123123123123123123123123123123123")
let secondInt = LongInt.fromString("987898789878987898789878987987898789878978")
console.log(firstInt.toString());
console.log(secondInt.toString());

console.log("Сумма:", LongInt.add(firstInt, secondInt).toString())
console.log("Разность:", LongInt.substruct(firstInt, secondInt).toString())
console.log("Произведение:", LongInt.multiply(firstInt, secondInt).toString())
console.log("Частное:", LongInt.divide(firstInt, secondInt).toString())

console.log("\n__Задача 3__\n");

let test_array = [
    new Product('smthfdsmth',2,4,'smthabc'), 
    new Product('fdsmth',3,5,'smthABC'), 
    new Product('smthfd',4,6,'abcsmth'), 
    new Product('smth',5,7,'smth'), 
    new Product('smth',6,8,'smt')
];
let productContainer = new ProductContainer(test_array);
console.log(productContainer.filter("name-contains-fd&price-<4"));

