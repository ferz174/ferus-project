function GetVarUrl(InUrl){
	var ArrIn = []; 
	var ValueAndKey = [];
	var ArrOut = []; 
	ArrIn = (InUrl.substr(1)).split('&'); 
	if(ArrIn[0]=="") return false; 
	for (i = 0; i < ArrIn.length; i ++) { 
		ValueAndKey = ArrIn[i].split('='); 
		ArrOut[ValueAndKey[0]] = ValueAndKey[1];
	}
	
	
	
	return ArrOut;
}

try {
	exports.GetVarUrl = GetVarUrl;
} catch (e) {
	nnod = (!nax) ? true : e instanceof ReferenceError;
}