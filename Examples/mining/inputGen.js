i = 1000000000000;
inc = 1000000000;
arr = []
for(var k = 1; k <= i; k += inc) {
  obj = {start: k, end: k + inc - 1};
  arr.push(obj);
}
res = {Input: arr};
console.log(JSON.stringify(res));
