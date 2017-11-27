function findidx(ArrIn, Key, Idx)
{
	for(var a = Idx||0 ; a < ArrIn.length; a++)
	{
		if(ArrIn[a] == Key) return a;
	}
	return -1;
}

function inidx(RowIn, Idx)
{
	var ArrOut = [];
	var ArrInCell = 0;
    for (var b = 0; b < RowIn.length; ++b)
	{
		if(RowIn[b].getAttribute(Idx) != null)
		{
			ArrOut[ArrInCell] = RowIn[b].getAttribute(Idx);
		}
			ArrInCell += 1;
	}
	return ArrOut
}

function outidx(ArrIn, Key)
{
    for(c = 0; c < ArrIn.length; c++)
	{		                     
		if(ArrIn[c] == Key)
		{
			return c;
		}	          
	} 
    return -1;	
}