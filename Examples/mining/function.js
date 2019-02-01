hashes = [];
hashFunction = function(inp) {
		var hash = 0, i, chr;
		if (inp.length === 0) return hash;
		for (i = 0; i < inp.length; i++) {
			chr   = inp.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	};
var sampleString = "Sample String";
for(var k = input.start; k <= input.end; k++) {
	var curHash = hashFunction(sampleString + k);
	if(curHash < -10000000000) {
		hashes.push(curHash);
	}
}
return {Hash: hashes};