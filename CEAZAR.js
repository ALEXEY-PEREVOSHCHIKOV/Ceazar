function GetRussianAlphFrequency() {
    return {'а': 8.01, 'б': 1.59, 'в': 4.54, 'г': 1.70, 'д': 2.98, 'е': 8.45, 'ё': 0.04, 'ж': 0.94, 'з': 1.65, 'и': 7.35, 'й': 1.21, 'к': 3.49, 'л': 4.40, 'м': 3.21, 'н': 6.70, 'о': 10.97, 'п': 2.81, 'р': 4.73, 'с': 5.47, 'т': 6.26, 'у': 2.62, 'ф': 0.26, 'х': 0.97, 'ц': 0.48, 'ч': 1.44, 'ш': 0.73, 'щ': 0.36, 'ъ': 0.04, 'ы': 1.90, 'ь': 1.74, 'э': 0.32, 'ю': 0.64, 'я': 2.0}
}


function GetValuesFromDict(dict) {
    let result = new Array();
    for (let i in dict) {
        result.push(dict[i]);
    }
    return result;
}


function FindShift(kanon, fact) {
    let minDifference = Number.MAX_VALUE;
    let result = 0;
    for (let shift = 0; shift < kanon.length; shift++) {
        let differenceSumm = 0;
        for (let i = 0; i < kanon.length; i++) {
            differenceSumm += Math.abs(kanon[i] - fact[(i + shift) % kanon.length]);
        }
        if (differenceSumm < minDifference) {
            result = shift;
            minDifference = differenceSumm;
        }
    }
    if(result>=6) result--;
    return result;
}


function GetTextCharsFreq(text, keys) {
    let result = {};
    for (i in keys) {
        result[keys[i]] = 0;
    }
    for (i in text) {
        if (text.charCodeAt(i) > 'я'.charCodeAt(0) || text.charCodeAt(i) < 'А'.charCodeAt(0)) {
            continue;
        }
        result[text[i].toLowerCase()]++;
    }
    for (i in result) {
        result[i] = (result[i] / text.length) * 100;
    }
    return result;
}


function Code(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 'я'.charCodeAt(0) || text.charCodeAt(i) < 'А'.charCodeAt(0)) {
            result += text[i];
            continue;
        }
        let newCharCode = text.charCodeAt(i) + shift;
        while (newCharCode > 'я'.charCodeAt(0)) {
            newCharCode = newCharCode - 'я'.charCodeAt(0) + 'А'.charCodeAt(0) - 1;
        }

        result += String.fromCharCode(newCharCode);
    }
    return result;
}


function Decode(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 'я'.charCodeAt(0) || text.charCodeAt(i) < 'А'.charCodeAt(0)) {
            result += text[i];
            continue;
        }
        let newCharCode = text.charCodeAt(i) - shift;
        while (newCharCode < 'А'.charCodeAt(0)) {
            newCharCode = newCharCode + 'я'.charCodeAt(0) - 'А'.charCodeAt(0) + 1;
        }
        result += String.fromCharCode(newCharCode);
    }
    return result;
}

let russianalphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
let NameofFile = process.argv[2];
let inputShift = 1;
let fs = require('fs');
let NeededText = fs.readFileSync(NameofFile).toString();
let russianAlphFreq = GetValuesFromDict(GetRussianAlphFrequency());
let StrongCodedText = Code(NeededText, inputShift);
let currentTextFreqvency = GetValuesFromDict(GetTextCharsFreq(StrongCodedText, russianalphabet));
let shift = FindShift(russianAlphFreq, currentTextFreqvency);
let DecodedText = Decode(StrongCodedText, shift);


console.log("Сдвиг = " + shift);
console.log("Раскодированный текст совпадает: ");
console.log(NeededText == DecodedText);