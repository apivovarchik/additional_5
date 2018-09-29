module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let bracketsPair = {};
  let bracketsType = {};
  for (let i = 0; i < bracketsConfig.length; i++) {
    let openingBracket = bracketsConfig[i][0];
    let closingBracket = bracketsConfig[i][1];
    bracketsPair[openingBracket] = closingBracket;
    bracketsPair[closingBracket] = openingBracket;
    bracketsType[openingBracket] = "opening";
    bracketsType[closingBracket] = "closing";
  }
  for (let k = 0; k < str.length; k++) {
    let currBracket = str.charAt(k);
    let topBracket = stack[stack.length - 1];
    if (bracketsType[currBracket] == "opening") {
      stack.push(currBracket);
    } else if (bracketsType[currBracket] == "closing" && currBracket != bracketsPair[currBracket] && stack.length == 0) {
      return false;
    } else if (bracketsType[currBracket] == "closing" && topBracket != bracketsPair[currBracket] && currBracket != bracketsPair[currBracket]) {
      return false;
    } else if (bracketsType[currBracket] == "closing" && topBracket == bracketsPair[currBracket]) {
      stack.pop();
    } else if (bracketsType[currBracket] == "closing" && stack.length == 0 && currBracket == bracketsPair[currBracket]) {
      stack.push(currBracket);
    } else if (bracketsType[currBracket] == "closing" && stack.length > 0 && topBracket == bracketsPair[currBracket]) {
      stack.pop();
    } else if (bracketsType[currBracket] == "closing" && stack.length > 0 && currBracket == bracketsPair[currBracket]) {
      stack.push(currBracket);
    }
  }
  return (stack.length == 0);
}