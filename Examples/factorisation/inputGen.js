i = 123456789123456789123

arr = []
for(var k = 1; k * k <= i; k += 100000000) {
  obj = {start: k, end: k + 100000000 - 1, num: i};
  arr.push(obj);
}
res = {Input: arr};
console.log(JSON.stringify(res));
