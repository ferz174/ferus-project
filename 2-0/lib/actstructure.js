GetVarStructure();

function GetVarStructure()
{
	XS_DG_DRAWINGS = "Drawings";
	XS_DIR_1C = "1C";
	XS_DIR_1C_KMD = XS_DIR_1C+"/KMD";
	XS_DIR_1C_KDD = XS_DIR_1C+"/KDD";
	XS_IFC_3D = "IFC_Geometry";
	XS_PDF_3D = "PDF_Geometry";
	XS_DSTV_PL = "DSTV_Plates";
	XS_DSTV_PROF = "DSTV_Profiles";
	XS_DXF_PL = "DXF_Plates";
	XS_BIN_CONV = "BIN_Conv";
	XS_IFC_CONV = XS_BIN_CONV+"/ifc2pdf";
	XS_DSTV_CONV = XS_BIN_CONV+"/dstv2dxf";
	XS_DWG_DRAWINGS = "DWG_Drawings";
	XS_DWG_KDD  = XS_DWG_DRAWINGS+"/KDD";
	XS_INF_MODEL = "INF_Model";
	XS_INF_TECHREQ = XS_INF_MODEL+"/TechReq";
	XS_INF_BOLTSNOTES = XS_INF_MODEL+"/BoltsNotes";
	XS_PDF_DRAWINGS = "PDF_Drawings";
	XS_PDF_KMD  = XS_PDF_DRAWINGS+"/KMD";
	XS_PDF_DMC  = XS_PDF_DRAWINGS+"/DMC";
	XS_PDF_KDD  = XS_PDF_DRAWINGS+"/KDD";
	XS_PDF_KMD1  = XS_PDF_DRAWINGS+"/KMD1";
	XS_PDF_REPORTS = "PDF_Reports";
	XS_REPORTS = "Reports";
	XS_PERF = "shell";
}

function SetArrStructure()
{
	var ArrOut = [
	XS_DG_DRAWINGS,
	XS_IFC_3D,
	XS_PDF_3D,
	XS_DSTV_PL,
	XS_DSTV_PROF,
	XS_DXF_PL,
	XS_DWG_DRAWINGS,
	XS_DWG_KDD,
	XS_INF_MODEL,
	XS_INF_TECHREQ,
	XS_INF_BOLTSNOTES,
	XS_PDF_DRAWINGS,
	XS_PDF_KMD,
	XS_PDF_DMC,
	XS_PDF_KDD,
	XS_PDF_KMD1,
	XS_PDF_REPORTS,
	XS_REPORTS];
	
	return ArrOut;
}

function GetArrStructure(ObjIn)
{
	var ArrOut = [];
	var SubStructure = ObjIn.info[ObjIn.info.info];
	var ParentKey;
	ArrOut.push(Repository);
	ArrOut.push(SubStructure);
	
	function GetKeyStructure(ObjIn, ArrOut, ParentKey)
	{
		for (var i in ObjIn)
		{
			if (typeof(ObjIn[i])=="object") {
				ParentKey = i;
				GetKeyStructure(ObjIn[ParentKey], ArrOut, ParentKey);
			} else {
				if (i != "info" && i != "length" && ParentKey != "info" && ObjIn.info != i) {
					ArrOut.push(SubStructure+ObjIn[i]);
					ArrOut.push(SubStructure+ObjIn[i]+Repository);
				} else if (i != "info" && i != "length" && ParentKey == "info" && ObjIn.info != i) {
					ArrOut.push(SubStructure+ObjIn[i]);
				}
			}
		}
		return ArrOut.sort(SortingByLength);
	}
	
	return GetKeyStructure(ObjIn, ArrOut, ParentKey);
	
	function SortingByLength(Path1, Path2) {
		if (Path1.length > Path2.length) return 1;
		return -1;
	}
}

function GetPathStructure(FolderIn)
{
	var ArrOut = [];
	ArrOut[0] = FolderIn;
	//ArrOut[1] = PathExport+"/"+Model;
	//ArrOut[2] = PathExportBak+"/"+Model;
	return ArrOut;
}

function GetCheckStructure(FolderIn)
{
	var ArrIn = SetArrStructure();
	var ArrOut = [];
	j = 0;
	for(i = 0; i < ArrIn.length; i++){
		if (!fso.FolderExists(FolderIn+"/"+ArrIn[i])){
			ArrOut[j] = ArrIn[i];
			j = j + 1;
		}
	}
	return ArrOut;
}

function GoCreateStructure(FolderIn, ArrOut)
{
try {
	var ArrIn = GetPathStructure(FolderIn);	
	if (!ArrOut) ArrOut = SetArrStructure();
	
	for (var i = 0; i < ArrIn.length; i++)
	{
		var FolderOut = ArrIn[i];
		if (!nax) {
			var FolderIn = fso.GetAbsolutePathName(FolderOut).replace(/\\/g,"/");	
			if (!fso.FolderExists(FolderIn)) fso.CreateFolder(FolderIn);
		} else if (!nnod) {
			if (!fso.existsSync(FolderOut))
				fso.mkdirSync(FolderOut, function(error){
				if (error) throw error;
			});
		}
			
		for (var j = 0; j < ArrOut.length; j++)
		{
			if (!nax) {
				var FolderIn = fso.GetAbsolutePathName(FolderOut+"/"+ArrOut[j]).replace(/\\/g,"/");		
				if (!fso.FolderExists(FolderIn)) fso.CreateFolder(FolderIn);	
			} else if (!nnod) {
				if (!fso.existsSync(FolderOut+"/"+ArrOut[j]))
					fso.mkdirSync(FolderOut+"/"+ArrOut[j], function(error){
					if (error) throw error;
				});
			}
		}
	}
	
	return true;
} catch (error) {
	if (nnod) {
		return error instanceof ReferenceError
	} else {
		console.log("Ошибка создания структуры")
	}
}
}

function CreateStructure()
{
	if (!nax && !nuse && (PathReports.lastIndexOf(Model) + 1)) {
		var PathOut = PathReports.substring(0, (PathReports.lastIndexOf(Model)-1))+"/"+Model;
	//} else if(!nax && (PathReports.lastIndexOf(PathExport) + 1) && fso.FolderExists(PathExport+"/"+Project)){
	} else if (!nax && !nuse && fso.FolderExists(PathExport+"/"+Project)) {
		var PathOut = PathExport+"/"+Project;
	} else if (PathReports.lastIndexOf(Project) + 1) {
		var PathOut = PathReports.substring(0, (PathReports.lastIndexOf(Project)-1))+"/"+Project;
	} else if (Project != "" || Project != "0" || Project != "1" || Project != "(?)") {
		var PathOut = PathReports+"/"+Project;
	} else {
		var PathOut = PathReports+"/"+Model;
	}
	
	if (nax || nuse) {
		PathOut = TransferProject();
	} else {
		//GoCreateStructure(PathOut);
	}

	return PathOut;
}

function TransferProject()
{
	var TimeRefresh = 300000;
	OutReply = GetLinkAlert();
	if (OutReply) {
		if (OutReply == "lock") {
			NoteEventAlert("Событие: Транзакция по проекту ["+Project+"] - находится в стадии проверки ...", "Пожалуйста, ожидайте ее дальнейшего движения. В случае продолжительного отсуствия движения по транзакции -  уведомите об этом разработчика инструмента", false, TimeRefresh, "note", 0);
			if (!nuse && document.getElementById("Project").getAttribute("repository")) NoteEventAlert("Событие: Инструкция по дальнейшим действиям", "На данном этапе синхронизация доступна только для дополнения файлов (если они не были загружены ранее). Замена файлов возможна только в случае их отклонения принимающей стороной (Вы можете попросить отклонить некорректные файлы).", false, TimeRefresh, "note", 0);
			CheckLock = true;
		} else {
			OutReply = GetLoadFile(true, GetPath(Resource, false), OutReply);
			if (OutReply) {
				NoteEventAlert("Событие: Транзакция по проекту ["+Project+"] - находится в стадии ожидания ...", "Пожалуйста, ожидайте ее дальнейшего движения. В случае продолжительного отсуствия движения по транзакции -  уведомите об этом разработчика инструмента", false, TimeRefresh, "attention", 0);
				if (!nuse && document.getElementById("Project").getAttribute("repository")) {
					if (confirm("Перейти по ссылке и открыть страницу с экспортированной транзакцией для проекта ["+Project+"] ?")) {
						window.open(OutReply);
					} else {
						//OutReply;
						NoteEventAlert("Событие: Ссылка на транзакцию скопирована в буфер обмена", "Вы можете поделиться ссылкой с другими участниками проекта или отправить им XML-исходники, теперь она связана с Вашими отправленными файлами", false, TimeRefresh, "note", 0);
					}
				}
			}
		}
		
		xhr.open("GET", PathProcess+"/"+"TransferProject?project="+encodeURI(Project)+"&user="+encodeURI(UserID)+"&repository="+encodeURI(Repository), false);
		xhr.send();
		if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) return xhr.responseText;
	} else {
		return false;
	}
}

try {
	exports.GetVarStructure = GetVarStructure;
	exports.GetArrStructure = GetArrStructure;
	exports.GoCreateStructure = GoCreateStructure;
} catch (error) {
	nnod = (!nax) ? true : error instanceof ReferenceError;
}