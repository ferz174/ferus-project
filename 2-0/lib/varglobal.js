GetVarGlobal();

function GetVarGlobal()
{
	NameShell = "tsms";
	VersionShell = "2-0";
	PortShell = "8888";
	EventError = new Object();
	NoteError = new Object();
	ModID = "_";
	EnumID = "-";
	
	try {
		if (document.location.protocol.indexOf("file") + 1) {
			nuse = false;
		} else if (document.location.protocol.indexOf("http") + 1) {
			nuse = true;
		}
		
		xhr = false;
		try {
			if (window.ActiveXObject) xhr = (new ActiveXObject("Microsoft.XMLHTTP") ? new ActiveXObject("Microsoft.XMLHTTP") : (new ActiveXObject("Msxml2.XMLHTTP") ? new ActiveXObject("Msxml2.XMLHTTP") : false));
		} catch (error) {}
		
		if (!xhr) xhr = ("onload" in new XMLHttpRequest()) ? new XMLHttpRequest : new XDomainRequest;
		
		nnod = true;
	} catch (error) {
		nuse = true;
		nnod = false;
	}
	
	if (nnod) OutReply = false;
	
	//if ((window.ActiveXObject)) {
	try {
		domxml = new ActiveXObject("Microsoft.XMLDOM");
		msxml = new ActiveXObject("MSXML");
		stream = new ActiveXObject("ADODB.Stream");
		fso = new ActiveXObject("Scripting.FileSystemObject");
		wsn = new ActiveXObject("WScript.Network");
		wsh = new ActiveXObject("WScript.Shell");
		User = wsn.UserName;
		ComputerName = wsn.ComputerName;
		nax = false;
	} catch (error) {
		nax = (typeof fso == "undefined") ? true : error instanceof ReferenceError;
		if (typeof domxml != "undefined") {
			domxml.async = false;
		} else if (nnod && document.implementation && document.implementation.createDocument) {
			domxml = document.implementation.createDocument("","",null);
			domxml.async = false;
			msxml = false;
		} else {
			if (!EventError.hasOwnProperty("Не удалось прочитать данные, передача невозможна")) EventError["Не удалось прочитать данные, передача невозможна"] = "Это может быть связано с политикой безопасности или ограниченными правами доступа";
		}
	}
	
	domtxt = function(TextIn)
	{
		return ( new window.DOMParser() ).parseFromString(TextIn, "text/xml");
	};
}

 function GetInfoBrowser()
{
	var uAgent = navigator.userAgent;
				
	var itIE = false;
	var nameBrowser = "";
	var version = 0;
					
	if(uAgent.indexOf("MSIE") != -1 || uAgent.indexOf(".NET") != -1) {
		if(uAgent.indexOf("MSIE") != -1) {										
			var re  = new RegExp("MSIE([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(uAgent) != null) version = parseFloat( RegExp.$1 );
		} else {
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(uAgent) != null) version = parseFloat( RegExp.$1 );
		}
		nameBrowser = "MSIE"; 
		itIE = true;
	}
					
	if(nameBrowser == "") {
		if(uAgent.indexOf("Firefox") != -1) nameBrowser = "Firefox";					
		else if(uAgent.indexOf("YaBrowser") != -1) nameBrowser = "YaBrowser";
		else if(uAgent.indexOf("Edge") != -1) nameBrowser = "Edge";					
		else if(uAgent.indexOf("Chrome") != -1) nameBrowser = "Chrome";
		else if(uAgent.indexOf("Safari") != -1) nameBrowser = "Safari";
		else if(uAgent.indexOf("Opera") != -1) nameBrowser = "Opera";
		else return {"itIE":itIE,"nameBrowser":"Неизвестный браузер","version":version};
			
		var re  = new RegExp(nameBrowser + "/([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(uAgent) != null) version = parseFloat( RegExp.$1 );
	} 
		
	return {"itIE":itIE,"nameBrowser":nameBrowser,"version":version};
}

try {
	exports.GetVarGlobal = GetVarGlobal;
} catch (error) {
	nnod = (!nax) ? true : error instanceof ReferenceError;
}