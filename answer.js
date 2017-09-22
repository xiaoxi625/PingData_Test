var fs = require('fs');
const filePath = './input.csv';
const outPath = './output.csv';
var map = {};
var store = [];


fs.readFile(filePath, {encoding: "utf8"}, function(err, data){
   if(err){
      console.log(err)
   }
   expression(data);
})


function expression(data) {
  var arr = data.split('\n')
    .filter((str) => !!str)
    .map((str) => str.split(','));

  let counter = 0;
  let flag = true;


  while(flag) {
    let changed = [];
    for( let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr[i].length; j++){
        let tmp = calc(arr[i][j], arr);
        arr[i][j] = typeof tmp !== 'string' ? tmp.toString() : tmp;

        if((/[a-z]+/.test(arr[i][j]))){
          changed.push(true);
        }else{
          changed.push(false);
        }
      }
    }
    console.log(arr)
    console.log(map)



    if(changed.every((change)=> !change)){
      console.log(arr);
      let res = arr.map(obj => {
        return obj.join(',')
      })

      res = res.join('\n')
      console.log(res);
      fs.writeFile(outPath,res,function(err){
         if(err){
            return console.log(err);
         }
      });
      return;
    }else{
    }



  }



}


function resolve(map, arr, flag){

}

function calc(data, arr){
  let strArr = data.trim().split(/[ ]+/);
  let counter = 0;
  let stack = [];


  if(!isValid(data)) {
    return '#ERR';
  }

  strArr.forEach((str)=>{
    if(isAlpha(str)){
      let col = str.replace(/\d+/g, '');
      let row = str.replace(/[a-zA-z]+/g, '');

      if(!isNumber(map[str])) {
        map[str] = arr[row - 1][alphaToNumber(col)];
        stack.push(str);
      } else {
        stack.push(map[str]);
      }

    }
    else if(isNumber(str)){
      stack.push(str);
    }
    else if(isOperation(str)){
      let last = stack.pop();
      let first = stack.pop();

      if(isNumber(last) && isNumber(first)) {
        stack.push(opcode(str, parseFloat(first), parseFloat(last)));
      } else {
        stack.push(first);
        stack.push(last);
        stack.push(str);
      }
    }
    else if(isSpace(str)){
      stack.push('0');
    }
  })

  return stack.length !==1 ? stack.join(' ') : stack.pop();

}

function alphaToNumber(str) {
  return str.charCodeAt(0) - 'a'.charCodeAt(0);
}

function isValid(str){
  let strArr = str.trim().replace(/[a-zA-Z]\d+/g, '0').split(/[ ]+/);
  let stack = [];


  for(let i = 0; i< strArr.length; i++) {
    if(isOperation(strArr[i])){
      if(stack.length < 2) {
        return false;
      }

      let last = stack.pop();
      let first = stack.pop();

      if(isNumber(last) && isNumber(first)) {
        stack.push(opcode(strArr[i], parseFloat(first), parseFloat(last)));
      } else {
        stack.push(first);
        stack.push(last);
        stack.push(strArr[i]);
      }
    } else if(isNumber(strArr[i])){
      stack.push(strArr[i]);
    } else if(isSpace(strArr[i])){
      stack.push('0');
    } else {
      return false
    }
  }

  return stack.length !== 1? false : true;
}

function isSpace(data) {
  return /^\s*$/.test(data);
}
function isAlpha(data){
  return /^[a-zA-Z]\d+$/.test(data)
}
function isNumber(data){
  return data !== '' && !isNaN(data)
}
function isOperation(data){
  return ['/','*','-','+'].some((op) => data === op)
}
function opcode(op, n, m) {
  switch(op) {
    case '+':
      return n + m;
      break;
    case '-':
      return n - m;
      break;
    case '*':
      return n * m;
    break;
    case '/':
      return n / m;
    break;
  }
}
