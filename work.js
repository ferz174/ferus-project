//var exec = require("child_process").exec;
//var busboy = require('busboy');
//var jsonfile = require('fs')

function GetUp(GetOut, GetUrl)
{
	if (fso.existsSync(PathReports+".lock")) {
		GetOutReply(200, GetOut, encodeURI("lock"), GetUrl);
		return;
	} else if (fso.existsSync(PathReports+"KMD.xml") || fso.existsSync(PathOut+Project+".json")) {
		GetOutReply(200, GetOut, encodeURI(PathReports.replace(PathProject, PathProjectOut)+"KMD.xml"), GetUrl);
		return;
	}
	
	GetOutReply(200, GetOut, "true", GetUrl);
}

function GetExportAnnul(GetOut, GetUrl)
{
	if (fso.existsSync(PathReports)) {
		fso.unlink(PathReports, function(error){
        if (error) {
			console.log(DateAndTime+" GetExportAnnul ["+Project+"]: "+PathReports+" - false");
			GetOutReply(200, GetOut, 0, GetUrl);
			return;
		}
		console.log(DateAndTime+" GetExportAnnul ["+Project+"]: "+PathReports+" - true");
		GetOutReply(200, GetOut, "true", GetUrl);
		});
	}
}

function GetTransferProject(GetOut, GetUrl)
{
	//actstructure.GoCreateStructure(PathProject,[UserID]);
	GetOutReply(200, GetOut, PathProjectOut, GetUrl);
}

function GetTransferStructure(GetOut, GetUrl)
{
	//if (GetTransferOptions(GetOut, GetUrl)) return;
	GetOutReply(200, GetOut, "true", GetUrl);
}

function GetTransferData(GetOut, GetUrl)
{
	if (GetTransferOptions(GetOut, GetUrl)) return;
	var FileOut = decodeURI(GetUrl.headers["file-name"]);
	
	if (fso.existsSync(PathReports+".lock")) {
		var OutReply = !fso.existsSync(PathOut+FileOut);
	} else {
		var OutReply = actstructure.GoCreateStructure(PathProject, [UserID]);
		OutReply = actstructure.GetArrStructure(ObjStructure);
		OutReply = actstructure.GoCreateStructure(PathProject+"/"+UserID, OutReply);
	}
	
	if (FileOut && OutReply) {
		var SaveStream = fso.createWriteStream(PathOut+FileOut);
		
		GetUrl.on('data', function(data) {
			SaveStream.write(data);
		});
		
		SaveStream.on('error', function(error) {
			GetOutReply(500, GetOut, 0, GetUrl);
			return;
		});
		
		GetUrl.on('end', function (){
			SaveStream.end();
			console.log(DateAndTime+" GetTransferData ["+Project+"]: "+FileOut);
			GetOutReply(200, GetOut, "true", GetUrl);
		});
	} else {
		GetOutReply(200, GetOut, "lock", GetUrl);
	}
}

function GetExportData(GetOut, GetUrl)
{
	var BuildData = new Array();
	var ObjIn = PathOut+Project+".json";
	
	const LoadFile = require('load-json-file');	
	LoadFile(ObjIn).then(data => {		
		var ObjOut = data;
		if (fso.existsSync(ObjIn)) BuildData = actobject.SetBuildData(PathReports, ObjOut);
		if (BuildData.length) {
			GetOutReply(200, GetOut, encodeURI(BuildData[0].replace(PathProject+"/", "../../")), GetUrl);
		} else {
			console.log(DateAndTime+" GetExportData ["+Project+"]: "+PathReports+" - false");
			return GetOutReply(500, GetOut, 0, GetUrl);
		}	
		ObjOut = new Object();
	});	
}

function GetFilesConsol(GetOut,GetUrl)
{
	var FilesOut = new Object();
	return GetOutReply(200, GetOut, FilesOut, GetUrl);
}

function GetOutReply(ErrorCode, respons, TextOut, request)
    {
      respons.writeHead(ErrorCode, {'Content-Type': 'text/plain; charset=utf-8',
                                    'Cache-Control': 'no-cache',
                                    'Connection': 'keep-alive',
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Headers': request.headers["access-control-request-headers"]});
      //respons.write(TextOut);
      respons.end(TextOut);
    }

function GetTransferOptions(GetOut, GetUrl) {
	//console.log(GetUrl.headers);
	if(GetUrl.method == 'OPTIONS' || GetUrl.headers["file-name"] == null) {
		GetOutReply(200, GetOut, "Access is open", GetUrl);
		return true;
	}
}

exports.GetUp = GetUp;
exports.GetTransferProject = GetTransferProject;
exports.GetTransferStructure = GetTransferStructure;
exports.GetTransferData = GetTransferData;
exports.GetExportData = GetExportData;
exports.GetExportAnnul = GetExportAnnul;