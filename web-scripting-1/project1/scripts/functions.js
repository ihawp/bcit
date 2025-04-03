export function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertIntToRoman(intToBeConverted) {
    const romanNumDict = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
  
    let intForCalc = intToBeConverted;
    let result = "";
  
    for (let numeral in romanNumDict) {
      while (intForCalc >= romanNumDict[numeral]) {
        result += numeral;
        intForCalc -= romanNumDict[numeral];
      }
    }
  
    return result;
  }
  