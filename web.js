web = require("http");
url = require("url");
fso = require("fs");
buildxml = require('xmlbuilder');
//jsdom = require("jsdom");
actvarglobal = require("./2-0/lib/varglobal");
acturl = require("./2-0/lib/getvarurl");
actpath = require("./2-0/lib/pathglobal");
actstructure = require("./2-0/lib/actstructure");
actobject = require("./2-0/lib/actobject");

function GetUp(GetRoute, Direct)
{
	function GetRequest(GetUrl, GetOut)
	{
		actstructure.GetVarStructure();
		actvarglobal.GetVarGlobal();
		actpath.GetPathGlobal();
		PathShell = process.cwd()+"/"+VersionShell;
		
		UrlObj = url.parse(GetUrl.url);
		PathURL = UrlObj.pathname;
		
		if (UrlObj.search != null) {
			VarUrl = acturl.GetVarUrl(UrlObj.search);
			if (VarUrl.project) Project = decodeURI(VarUrl.project);
			if (VarUrl.user) UserID = decodeURI(VarUrl.user);
			if (VarUrl.repository) Repository = decodeURI(VarUrl.repository);
			if (VarUrl.structure) ObjStructure = JSON.parse(decodeURI(VarUrl.structure));
			PathProjectOut = PathTmp+"/"+Project;
			PathProject = PathShell+"/"+PathProjectOut;
			PathOut = PathProject+"/"+UserID+Repository;
			PathReports = PathProject+"/"+Reports+Repository;
		}
		
		DateAndTime = new Date();
		DateAndTime.setHours(DateAndTime.getHours() + 5);
		DateAndTime = DateAndTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
		
		GetRoute(Direct, PathURL, GetOut, GetUrl);
	}
	web.createServer(GetRequest).listen(8888);
}

exports.GetUp = GetUp;