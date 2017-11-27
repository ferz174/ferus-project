function GetTextFile(TechReqID, FileIn)
{	
try {
		if (!FileIn) return;
		var FileTextArr = [];
		var Text = false;
		var TextRows = 28;
		if (!nax && !(FileIn.indexOf("http:") + 1) && fso.FileExists(FileIn)) {
			var FileOut = fso.OpenTextFile(FileIn, 1, false);
			Text = FileOut.readAll();
			TextRows = Text.indexOf("\n");
			FileOut.Close();
		} else {
			xhr.open("GET", FileIn, false);
			// if (typeof(xhr.onload) != "undefined") {
				// xhr.onload = function() {};
				// xhr.onload = function()
				// {
					// if (xhr.status != 200 || xhr.status != 304) {
						// Text = xhr.responseText;
						// TextRows = Text.indexOf("\n");
						// SetTextTechReq(Text, TextRows);
					// }
				// };
			// }
			xhr.send();
			
			if ((xhr.status == 200 || xhr.status == 304) && xhr.responseText) {
				Text = xhr.responseText;
				TextRows = Text.indexOf("\n");
			} else {
				return false;
			}
		}
		
		SetTextTechReq(Text, TextRows);
		
		function SetTextTechReq(Text, TextRows)
		{
			TechReqID.value = Text;
			TechReqID.rows = TextRows+1;
		}
		
		return Text;
	} catch (error) {
		if (!EventError.hasOwnProperty("Ошибка чтения тех. требований ("+error.message+")")) EventError["Ошибка чтения тех. требований ("+error.message+")"] = "Обратитесь к разработчику инструмента";
		return false;
	}
}

function GetText()
{
	
}

function GetTempFile(FileIn)
{
try {
		var FileIn = GetFileIn(FileIn);
		var ArrTemp = [ComputerName,ComputerName+"/"+UserName,ComputerName+"/"+UserName+"/"+FileIn.ParentName];
		GoCreateStructure(PathTemp,ArrTemp);
		var FileOut = PathTemp+"/"+ArrTemp[ArrTemp.length-1]+"/"+FileIn.File;
		//if (fso.FileExists(FileOut)) fso.DeleteFile(FileOut);// don't delete ???
		fso.CopyFile(FileIn.FilePath, PathTemp+"/"+ArrTemp[ArrTemp.length-1]+"/"+FileIn.File);
		return FileOut;
	} catch (error) {
		NoteEventAlert("Событие: Ошибка обработки временного файла ("+error.message+")", "Обратитесь к разработчику инструмента", false, 30000, "error");
	}
}

function OpenFile(FileIn)
{
	try {
		if (!nax && !nuse && !(FileIn.indexOf("http") + 1)) {
			window.open(GetTempFile(FileIn));
		} else {
			window.open(FileIn);
		}
	} catch (error) {
		NoteEventAlert("Событие: Ошибка открытия файла ("+error.message+")", "Обратитесь к разработчику инструмента", false, 30000, "error");
	}
}

function OpenGeometry(Assembly, File, Version, PathReport, PathReport0)
{
try {
		if (!PathReport0) {
			var PathIn = PathReport;
		} else {
			var ObjReport = GetObject(PathReport0);
			for (var i in ObjReport)
			{
				delete ObjReport[GetFileIn(PathReport0).FileName];
				delete ObjReport.info;
				ObjAssemblys = ObjReport[i];
			}
			if (ObjAssemblys.hasOwnProperty(Assembly)) PathIn = PathReport0;
		}
		
		PathAssView = Resource+"/"+PathAssView;
		
		document.location.href = PathAssView+"?id="+encodeURI(Assembly)+"&file="+File+"&version="+Version+"&path="+encodeURI(PathIn);
	} catch (error) {
		NoteEventAlert("Событие: Ошибка открытия геометрии ("+error.message+")", "Обратитесь к разработчику инструмента", false, 30000, "error");
	}
}

function SaveFile(FileIn, FileNameInfo)
{
try {
	$('input[name="save"]').on("click",function()
	{
		var TextArea = $("#TextArea").val();
		if (fso.FileExists(FileIn)) fso.DeleteFile(FileIn, true);
		FileIn = fso.CreateTextFile(FileIn, false);
		while (TextArea)
		{
			StatEnt = TextArea.indexOf("\n");
			if (StatEnt > -1) {
				FileIn.WriteLine(TextArea.substr(0, StatEnt));
				TextArea = TextArea.substr(StatEnt+1);
			} else {
				FileIn.WriteLine(TextArea);
				break;
			}
		}
		FileIn.Close();
		var TimeRefresh = 3000;
		NoteEventAlert("Событие: Файл \""+FileNameInfo+"\" сохранен в модель:", Model, false, TimeRefresh, "note");
		Refresh(TimeRefresh);
	});
	} catch (error) {
		NoteEventAlert("Событие: Ошибка сохранения файла ("+error.message+")", "Обратитесь к разработчику инструмента", false, 30000, "error");
	}
}

function DelFile(FileIn, FileNameInfo, Model)
{
try {
	$('input[name="del"]').on("click",function()
	{
		if (fso.FileExists(FileIn)){
			fso.DeleteFile(FileIn, true);
			var TimeRefresh = 3000;
			NoteEventAlert("Событие: Файл \""+FileNameInfo+"\" УДАЛЕН из модели:", Model, false, TimeRefresh, "attention");
			Refresh(TimeRefresh);
		} else {
			EventError[""] = "Текст загружен из шаблона. Не забудьте СОХРАНИТЬ его после редактирования.";
			NoteEventAlert("Событие: Не удалось прочитать файл \""+FileNameInfo+"\"", "Текст загружен из шаблона. Не забудьте СОХРАНИТЬ его после редактирования.", false, 30000, "error");
		}
	});
	} catch (error) {
		NoteEventAlert("Событие: Ошибка удаления файла ("+error.message+")", "Обратитесь к разработчику инструмента", false, 30000, "error");
	}
}

function GetPath(FileIn, ApplyIn)
{
	if (typeof(ApplyIn) == "undefined") ApplyIn = true;
	if (!FileIn || FileIn == "" || FileIn == "undefined") return false;
	
	var FileIn = FileIn.replace(/#/g,"");
		if (window.location.hostname == "") {
			FileIn = FileIn.replace("file:///", "");
		} else {
			FileIn = FileIn.replace("file:", "");
		}
	
	if (ApplyIn) {
		return FileIn.replace("http:", "");
	} else {
		return FileIn;
	}
}

function GetFileIn(FileIn)
{
	if (!FileIn || FileIn == "" || FileIn == "undefined") return false;
	
	FileIn = GetPath(FileIn, false);
	
	var FileVersion = 0;
	if (!nax && fso.FileExists(FileIn)) {
		FileIn = fso.GetAbsolutePathName(FileIn).replace(/\\/g,"/");
		FileParentFolder = fso.GetParentFolderName(FileIn).replace(/\\/g,"/");
		File = fso.GetFileName(FileIn);
		FileName = fso.GetBaseName(File);
		FileExt = fso.GetExtensionName(FileIn);
	} else {
		FileIn = FileIn.replace(/\\/g,"/");
		FileParentFolder = (FileIn.substring(0, FileIn.lastIndexOf("/")) == "") ? "" : FileIn.substring(0, FileIn.lastIndexOf("/"));
		File = (FileParentFolder) ? FileIn.replace(FileParentFolder+"/","") : FileIn;
		FileName = (File.substring(0, File.lastIndexOf(".")) != "") ? File.substring(0, File.lastIndexOf(".")) : File.substring(0, File.length);
		FileExt = (File.substring(File.lastIndexOf(".")+1) == File.substring(0, File.length)) ? "" : File.substring(File.lastIndexOf(".")+1);
	}
	ParentName = (FileParentFolder) ? FileParentFolder.substring(FileParentFolder.lastIndexOf("/") + 1) : "";
	if (FileName.lastIndexOf(ModID) + 1) FileVersion = Number(FileName.substring(FileName.lastIndexOf(ModID)+1,FileName.length));
	
	return {"FileParentFolder":FileParentFolder,"ParentName":ParentName,"FileName":FileName,"File":File,"FilePath":FileIn,"FileExt":FileExt,"FileVersion":FileVersion};
}

function GetLoadFile(PathRoot, PathIn, FileIn)
{
try {
	if (!FileIn || FileIn == "" || FileIn == "undefined") return false;
	var FileOut = GetFindFile(PathRoot, PathIn, FileIn, true);
	var PathRoot = PathRoot.replace(/\s/g, "%20");
	var PathIn = PathIn.replace(/\s/g, "%20");
	var FileIn = FileIn.replace(/\s/g, "%20");

	//console.log(PathRoot+" | "+PathIn+" | "+FileIn);
	
	var FileLoad = domxml.load(FileIn);
	if (FileLoad) FileIn = (typeof(domxml.URL) != "undefined") ? domxml.URL : domxml.url;
	if (domxml.load(FileIn) && domxml.documentElement) return (typeof(domxml.URL) != "undefined") ? domxml.URL : domxml.url;
	
	var XMLIn = GetMSXML(FileIn);
	if (XMLIn) return XMLIn.URL;
	return FileOut;
} catch (error) {
	try {
		var XMLIn = GetMSXML(FileIn);
		if (XMLIn) return XMLIn.URL;
		return FileOut;
	} catch (error) {
		return FileOut;
	}
	return error instanceof ReferenceError;
}
}

function GetMSXML(FileIn)
{
	try {
		if (!nax && msxml) {
			msxml.url = FileIn;
			if (msxml.root) return msxml;
		}
		return false;
	} catch (error) {
		return error instanceof ReferenceError;
	}
}

function GetFindFile(PathRoot, PathIn, FileIn, ApplyIn)
{
	if (!FileIn || FileIn == "" || FileIn == "undefined") return false;
	if (nuse && ((PathIn.indexOf("http") + 1) || (FileIn.indexOf("http") + 1))) {
		var PathRoot = encodeURI(PathRoot);
		var PathIn = encodeURI(PathIn);
		var FileIn = encodeURI(FileIn);
	}
	//console.log(PathRoot+" | "+PathIn+" | "+FileIn);
	
	if (!nax && !(PathIn.indexOf("http") + 1)) {
		if (fso.FileExists(PathIn+"/"+FileIn)) {
			if (!PathRoot && !ApplyIn) FileSearch = true;
			return fso.GetAbsolutePathName(PathIn+"/"+FileIn).replace(/\\/g,"/");
		} else if (PathRoot && PathRoot != "false") {
			var FileOut = GetFindPath(PathExport, FileIn);
			PathRoot = FileOut.PathRoot;
			FileIn = FileOut.FileIn;
			return GetFindFile(false, GetPath(PathRoot), FileIn, false);
		} else {
			return false;
		}
	} else if (!PathRoot) {
		return false;
	} else if (nax || nuse) {
		if (GetUpLoadFile(PathIn+"/"+FileIn)) return PathIn+"/"+FileIn;
		
		if (typeof(ApplyIn) != "undefined" && ApplyIn) {
			var FileOut = GetFindPath(PathIn, FileIn);
			PathIn = FileOut.PathRoot;
			FileIn = FileOut.FileIn;
			if (GetUpLoadFile(PathIn+"/"+FileIn)) return PathIn+"/"+FileIn;
		}
		
		if (!(PathRoot.indexOf(Resource) + 1)) {
			var FileOut = GetFindPath(PathRoot, FileIn);
			PathRoot = FileOut.PathRoot;
			FileIn = FileOut.FileIn;
			return GetUpLoadFile(PathRoot+"/"+FileIn);
		}
		
		function GetUpLoadFile(FileIn)
		{
			try {
				xhr.open("GET", FileIn, false);
				xhr.send();
				if (xhr.status == 200 || xhr.status == 304) return FileIn;
				return false;
			} catch (error) {
				return error instanceof ReferenceError;
			}
		}
	}
}

function GetFindPath(PathRoot, FileIn, ApplyIn)
{
	if (typeof(ApplyIn) == "undefined") ApplyIn = true;
	if (!FileIn || FileIn == "" || FileIn == "undefined") return false;
	if (PathRoot) {
		var ResourceFind = GetPath(Resource);
		if (nax) {
			if (!(PathRoot.indexOf(ResourceFind) + 1)) PathRoot = Resource+"/"+PathRoot;
			if (Resource.indexOf("file:") + 1) PathRoot = PathRoot.replace(Resource, ResourceFind);
		} else {
			if ((PathRoot.indexOf(ResourceFind) + 1) && !(Resource.indexOf("http:") + 1)) PathRoot = PathRoot.replace(ResourceFind, Resource);
		}
		
		PathRoot = PathRoot+Repository+UserID;
	}
	
	if (FileIn.lastIndexOf(Repository) + 1) {
	} else if (FileIn.lastIndexOf("/"+UserID+"/") + 1) {
		FileIn = FileIn.replace("/"+UserID+"/", Repository);
	} else if (FileIn.lastIndexOf("/"+UserName+"/") + 1) {
		FileIn = FileIn.replace("/"+UserName+"/", Repository);
	} else if (FileIn.lastIndexOf("/"+XS_PERF+"/") + 1) {
		FileIn = FileIn.replace("/"+XS_PERF+"/", Repository);
	} else if (FileIn.indexOf("../../") + 1) {
		var FileOut = GetFileIn(FileIn);
		FileIn = FileOut.FileParentFolder+Repository+FileOut.File;
	} else if (ApplyIn) {
		var FileOut = GetFileIn(FileIn);
		FileIn = "../"+FileOut.FileParentFolder+Repository+FileOut.File;
	} else {
		var FileOut = GetFileIn(FileIn);
		FileIn = FileOut.FileParentFolder+Repository+FileOut.File;
	}
	
	return {"PathRoot":PathRoot, "FileIn":FileIn};
}

function SaveStreamFile(ObjOut, FileOut, TextIn)
{
	if (!nax && !nuse) {
		var StreamFile = stream;
		StreamFile.Open();
		StreamFile.Type = 2;
		StreamFile.Position = 0;
		StreamFile.Charset = "utf-8";
		if (typeof(TextIn) == "undefined" || !TextIn || TextIn == "") {
			StreamFile.WriteText((ObjOut).replace(/>/g,">\n"));
		} else {
			StreamFile.WriteText((TextIn+ObjOut).replace(/>/g, ">\n"));
		}
		StreamFile.SaveToFile(FileOut, 2);
		StreamFile.Close();
	}
}

function SetLockFile()
{
	if (!nax) {
		var LockOutObject = new Object();
		LockOutObject["ActID"] = ActID;
		LockOutObject["Date"] = new Date().GetDateDB(5);
		LockOutObject["Exporter"] = User;
		LockOutObject["Transfer"] = UserName;
		LockOutObject["Repository"] = Repository;
		LockOutObject["info"] = "Transfer";
		
		var LockOut = PathReports+"/"+".lock";
		
		if ((PathReports.indexOf("http:") + 1) && (PathReports.indexOf("/"+UserID) + 1)) {
			if (confirm("Пройдя по ссылке Вам будут доступны возможности изменения, экспорта или отклонения транзакции от подрядчика. Вам необходимо проверить и двинуть или отклонить цепочку файлов дальше в папку \"Экспорт\" по соответствующей кнопке. Нажав \"OK\" Вы принимаете выгруженную транзакцию от подрядчика в работу.\nПРИНЯТЬ В РАБОТУ ТРАНЗАКЦИЮ ОТ ПОДРЯДЧИКА ???")) {
				document.location.href = Report.FilePath.replace("http:","file:");
			} else {
				return;
			}
		}
		
		if ((PathReports.indexOf("/"+User) + 1) || (PathReports.indexOf("/"+UserID) + 1)) SaveStreamFile(JSON.stringify(LockOutObject), LockOut);
	}
}

function GetFilesFolder(FolderIn)
{
	var FolderIn = GetPath(FolderIn);
	if (!nax && !(FolderIn.indexOf("http") + 1)) {
		if (!fso.FolderExists(FolderIn)) {
			if (!EventError.hasOwnProperty("Нет папки с заказом \""+Project+"\" в папке сводка")) EventError["Нет папки с заказом \""+Project+"\" в папке сводка"] = "Обратитесь в конструкотрский отдел";
			return false;
		}
		
		var FilesOut = new Object();
		var Files = new Enumerator(fso.GetFolder(FolderIn).files);
		for (; !Files.atEnd(); Files.moveNext())
		{
			var FileName = fso.GetBaseName(Files.item().Name);
			var FileInfo = new Object();
			if (FileName.indexOf(ModID) + 1) {
				var FileModIDInfo = new Object();
				FileModIDInfo["info"] = GetFileInfo(Files.item());
				FileModIDInfo.info["Version"] = Number(FileName.substring(FileName.indexOf(ModID)+1, (FileName.indexOf(ModID)+FileName.length)));
				FilesOut[FileName.substring(0, FileName.indexOf(ModID))] = FileModIDInfo;
			} else {
				FileInfo["info"] = GetFileInfo(Files.item());
				var FileExt = FileInfo.info.Extension;
				var FileСrypt = FileInfo.info.Size;
				//FileСrypt = CryptoJS.MD5(Files.item().OpenAsTextStream().readAll());
				FileInfo.info["Hash"+FileExt.toUpperCase()] = FileСrypt;
				FilesOut[FileName] = FileInfo;
			}
		}
		
		function GetFileInfo(ObjIn)
		{
			var info = new Object();
			var FileName = fso.GetBaseName(ObjIn.Name);
			var FilePath = ObjIn.Path.replace(/\\/g,"/");
			var FileExt = fso.GetExtensionName(ObjIn.Name);
			info["info"] = FileName;
			info["File"] = ObjIn.Name;
			info["Name"] = FileName;
			info["Path"] = FilePath;
			info["Size"] = Number(ObjIn.Size);
			info["Extension"] = FileExt;
			info["PathParent"] = ObjIn.ParentFolder.Path.replace(/\\/g,"/");
			info["DateCreated"] = new Date(ObjIn.DateCreated).GetDateDB();
			info["DateLastAccessed"] = new Date(ObjIn.DateLastAccessed).GetDateDB();
			info["DateLastModified"] = new Date(ObjIn.DateLastModified).GetDateDB();
			info["ParentName"] = ObjIn.ParentFolder.Name;
			info["Type"] = ObjIn.Type;
			info["Version"] = 0;
			info["Hash"+FileExt.toUpperCase()] = "0";
			return info;
		}
		
		return FilesOut;
	} else {
		return false;
	}
}

Date.prototype.GetDateDB = function(ApplyIn)
{
	if (typeof(ApplyIn) == "undefined") ApplyIn = 0;
	return this.getUTCFullYear()+"-"+twoDigits(1+this.getUTCMonth())+"-"+twoDigits(this.getUTCDate())+" "+twoDigits(this.getUTCHours()+ApplyIn)+":"+twoDigits(this.getUTCMinutes())+":"+twoDigits(this.getUTCSeconds());
}

function twoDigits(DateIn)
{
	if(0 <= DateIn && DateIn < 10) return "0" + DateIn.toString();
	if(-10 < DateIn && DateIn < 0) return "-0" + (-1*DateIn).toString();
	return DateIn.toString();
}

function ConvPDF(FileIn)
{
try {
		var PathXML = GetFileIn(FileIn);
		var PathPDF = GetFileIn(PathXML.FileParentFolder.replace(new RegExp(XS_REPORTS,'g'),XS_PDF_REPORTS));
		
		console.log(PathProject);
		
		GoCreateStructure(PathProject,[PathPDF.ParentName,PathPDF.FileName]);
		
		wsh.Run(XML_PDF+" "+PathXML.FilePath+" "+PathPDF.FilePath);
	} catch (error) {
		NoteEventAlert("Событие: Ошибка конвертации файла ("+error.message+")", "Обратитесь к разработчику инструмента", false, 30000, "error");
	}
}