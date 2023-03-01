function capitalizeFirst(str){
    if (str == "") return str;
    else if (str.length == 1) return str.toUpperCase();
    else return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

const PUNCTUATION = ":;,.!?";

function fixPunctuation(str){
    let result = "";
    for (let i=0; i < str.length; i++){
        if (str[i]==' ' && i+1 < str.length && str[i+1]==' '){
            continue;
        } else if (str[i]==' ' && i+1 < str.length && PUNCTUATION.includes(str[i+1])){
            continue;
        } else if (PUNCTUATION.includes(str[i]) && i+1 < str.length && str[i+1]!=' ') {
            result += str[i];
            result += " ";
            continue;
        }
        result += str[i]
    } 
    return result
}

// Словами считаю только такие наборы символов, которые содержат хотя бы одну букву или цифру

function countWords(str){
    return fixPunctuation(str).split(" ").filter( word => !word.match(/[:;,.!?]/g) ).length;
}

function countUniqueWords(str){
    let map = new Map();
    let temp = fixPunctuation(str).toLowerCase();

    for (let word of temp.split(" ")){
        let resultWord = (word.match(/[:;,.!?]$/g)) ? word.slice(0, word.length-1) : word;
        if (resultWord == "") continue;

        if (map.get(resultWord)){
            map.set(resultWord, map.get(resultWord)+1);
        } else {
            map.set(resultWord, 1);
        }
    }
    return map;
}

export {capitalizeFirst, fixPunctuation, countWords, countUniqueWords}