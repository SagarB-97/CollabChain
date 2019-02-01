factor = [];
for(var k = input.start; k <= input.end && k * k <= input.num; k++) {
	if(input.num % k == 0) {
		factor.push(k);
		factor.push(input.num / k);
	}
}
return {Factor: factor};