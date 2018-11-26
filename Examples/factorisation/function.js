arr = input.Input;
outArr = [];
for(var i = 0; i < arr.length; i++) {
	obj = arr[i];
	factor = [];
	for(var k = obj.start; k <= obj.end && k * k <= obj.num; k++) {
		if(obj.num % k == 0) {
			factor.push(k);
			factor.push(obj.num / k);
		}
	}
	outArr.push({Factor: factor});
}
return {output: outArr};