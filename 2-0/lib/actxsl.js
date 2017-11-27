function GetFileDrawing(StrTD, EventError, NoteError, ApplyIn)
{
try {
		if (typeof(ApplyIn)=="undefined") ApplyIn = true;
		var File = 0;
		var Version = 0;
		
		var Drawing = StrTD[PathDrawingID].getAttribute("title");
		var PathDrawing = StrTD[PathDrawingID].getAttribute("hrefID");
		var NumberDrawing = (StrTD[NumberDrawingID].getAttribute("DrawingID")) ? StrTD[NumberDrawingID].getAttribute("DrawingID") : (typeof(StrTD[NumberDrawingID].textContent) != "undefined") ? StrTD[NumberDrawingID].textContent : StrTD[NumberDrawingID].innerText;
		var SheetDrawing = (StrTD[SheetDrawingID].getAttribute("DrawingID")) ? StrTD[SheetDrawingID].getAttribute("DrawingID") : (typeof(StrTD[SheetDrawingID].textContent) != "undefined") ? StrTD[SheetDrawingID].textContent : StrTD[SheetDrawingID].innerText;
		var SheetsDrawing = (StrTD[SheetsDrawingID].getAttribute("DrawingID")) ? StrTD[SheetsDrawingID].getAttribute("DrawingID") : (typeof(StrTD[SheetsDrawingID].textContent) != "undefined") ? StrTD[SheetsDrawingID].textContent : StrTD[SheetsDrawingID].innerText;
		
		if (ApplyIn && SheetsDrawing.indexOf("(?)") + 1) {
			StrTD[SheetsDrawingID].bgColor = "#fdbcb4";
			//if (!NoteError.hasOwnProperty("Ошибка нумерации чертежа!")) NoteError["Ошибка нумерации чертежа!"] = "#fdbcb4";
		}
		
		if (Drawing && NumberDrawing.indexOf("(?)") + 1) {
			Drawing = false;
			StrTD[PathDrawingID].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет чертежа в модели!' title='Нет чертежа в модели!'>";
			if (ApplyIn) StrTD[NumberDrawingID].bgColor = "#fdbcb4";
			if (!NoteError.hasOwnProperty("Нет чертежа в модели!")) NoteError["Нет чертежа в модели!"] = "#ff99b8";
		}
		
		if (SheetDrawing.indexOf("(?)") + 1) {
			Drawing = false;
			StrTD[PathDrawingID].innerHTML = "<img height='15' src='"+PathIMGMain+"/drawtekla-no.png' alt='Ошибка нумерации чертежа!' title='Ошибка нумерации чертежа!'>";
			if (ApplyIn) StrTD[SheetDrawingID].bgColor = "#fdbcb4";
			if (!NoteError.hasOwnProperty("Ошибка нумерации чертежа!")) NoteError["Ошибка нумерации чертежа!"] = "#fdbcb4";
		}
		
		if (Drawing) {
			FileSearch = false;
			PathDrawing = GetFindFile(PathProject, PathReports, PathDrawing, true);
		} else {
			PathDrawing = false;
		}
		
		if (Drawing && PathDrawing) {
			if (FileSearch) {
				var FileFindIMG = "filefind_search.png";
				var FileFindTitle = "Файл не найден в модели.\nНо найден в экспорте !";
				if (!NoteError.hasOwnProperty("Нет PDF-файла чертежа!")) NoteError["Нет PDF-файла чертежа!"] = "#fdbcb4";
			} else {
				var FileFindIMG = "filefind-yes.png";
				var FileFindTitle = "Чертеж: "+Drawing;
			}
			
			StrTD[PathDrawingID].innerHTML = "<a href='#' onclick='OpenFile(\""+PathDrawing+"\")'><img height='15' src='"+PathIMGMain+"/"+FileFindIMG+"' title='"+FileFindTitle+"' alt='"+Drawing+"' border='0'></a>";
			if (NoteError.hasOwnProperty(NoteRemove)) delete NoteError[NoteRemove];
		} else if (Drawing) {
			StrTD[PathDrawingID].innerHTML = "<img height='15' src='"+PathIMGMain+"/drawtekla-no.png' alt='Нет PDF-файла чертежа!' title='Нет PDF-файла чертежа!'>";
			if (!NoteError.hasOwnProperty("Нет PDF-файла чертежа!")) NoteError["Нет PDF-файла чертежа!"] = "#fdbcb4";
		}
			
		if (Drawing) {
			Drawing = GetFileIn(Drawing);
			
			if ((SheetsDrawing.indexOf("(?)") + 1) || (SheetsDrawing.indexOf("1") + 1)) {
				Drawing.FileName = Drawing.FileName.substring(0,Drawing.FileName.lastIndexOf("-1"))
			}
			Drawing.FileName = Drawing.FileName.replace(Chapter,"");
			
			Drawing.File = Drawing.FileName+".pdf";
			Drawing.FileName = Drawing.FileName.replace(ModID+Drawing.FileVersion,"");
		}
		
		if (Drawing && FilesConsol && FilesConsol.hasOwnProperty(Drawing.FileName)) {
			var FileOut = GetFileVersion(FilesConsol[Drawing.FileName].info.Path,FilesConsol[Drawing.FileName].info.Version,Drawing.FileVersion);
			File = FileOut.File;
			Version = FileOut.Version;
		} else if (Drawing) {
			var FileOut = GetFileExists(PathConsol+"/"+Drawing.File);
			if (FileOut.FileExists) File = FileOut.File;
		}
		
		if (!File) {
			if (ApplyIn) {
				StrTD[DrawingID].innerHTML = "<img height='15' src='"+PathIMGMain+"/drawtekla-no.png' alt='Нет чертежа в сводке!' title='Нет чертежа в сводке!'>";
			} else {
				StrTD[VersionID].bgColor = "#fdbcb4";
				StrTD[VersionID].innerHTML = "<font face='Times' size='3'>Нет чертежа в сводке!</font>";
			}
		}
		
		if (!File && !PathDrawing && !NoteError.hasOwnProperty(NoteRemove)) NoteError[NoteRemove] = "";
		
		function GetFileVersion(FileIn,ManVersion,FileVersion)
		{
			var Version = 0;
			var FileOut = GetFileExists(FileIn);
			
			if (FileOut.FileExists) {
				var File = FileOut.File;
			} else {
				var File = 0;
				if (!EventError.hasOwnProperty("Удален файл: "+FileOut.FileName+"")) EventError["Удален файл: "+FileOut.FileName+""] = "Данные не актуальны. Обновите страницу по клавише \"F5\"";
			}
			
			if (!ManVersion && !FileVersion) {
				FileIn = FileIn.replace(FileOut.FileName, FileOut.FileName+ModID+1);
			} else if (ManVersion >= FileVersion){
				FileIn = FileIn.replace(ModID+ManVersion, ModID+(ManVersion + 1));
			} else if (ManVersion < FileVersion){
				FileIn = FileIn.replace(ModID+FileVersion, ModID+(FileVersion + 1));
			}
			
			FileOut = GetFileExists(FileIn);
			
			if (ManVersion > FileVersion) {
				Version = ManVersion;
				if (ApplyIn) {
					if (!NoteError.hasOwnProperty("Чертеж с ручным изм. <b>"+ManVersion+"</b> !!!")) NoteError["Чертеж с ручным изм. <b>"+ManVersion+"</b> !!!"] = "#fdbcb4";
				} else {
					StrTD[VersionID].bgColor = "#fdbcb4";
					StrTD[VersionID].innerHTML = "<font face='Times' size='3'>С ручным изм. <b>"+ManVersion+"</b> !!!</font>";
				}
			}
			
			if (ManVersion < FileVersion) {
				if (ApplyIn) {
					if (!NoteError.hasOwnProperty("Чертеж в сводке устарел!")) NoteError["Чертеж в сводке устарел!"] = "#fdbcb4";
				} else {
					StrTD[VersionID].bgColor = "#fdbcb4";
					StrTD[VersionID].innerHTML = "<font face='Times' size='3'>Чертеж в сводке устарел!</font>";
				}
			}
			
			if (FileOut.FileExists) {
				ManVersion = ManVersion + 1;
				if (ManVersion > FileVersion) {
					Version = ManVersion;
					if (!EventError.hasOwnProperty("Добавлен файл (изм.): "+FileOut.FileName+"")) EventError["Добавлен файл (изм.): "+FileOut.FileName+""] = "Данные не актуальны. Обновите страницу по клавише \"F5\"";
				}
				File = FileOut.File;
			}
			
			return {"File":File, "Version":Version};
		}
		
		function GetFileExists(FileIn)
		{
			var FileOut = GetFileIn(FileIn);
			if (GetFindFile(PathConsol, FileOut.FileParentFolder, FileOut.File, true)) {
				if (NoteError.hasOwnProperty(NoteRemove)) delete NoteError[NoteRemove];
			
				if (ApplyIn) {
					StrTD[DrawingID].innerHTML = "<a href='#' onclick='OpenFile(\""+FileOut.FilePath+"\")' title='"+FileOut.FileName+"'><img height='15' src='"+PathIMGMain+"/filefind-ok.png' alt='"+FileOut.FileName+"' border='0'></a>";
				} else {
					StrTD[DrawingID].innerHTML = "<a href='#' onclick='OpenFile(\""+FileOut.FilePath+"\")' title='"+FileOut.FileName+"'><b>"+FileOut.FileName+"</b></a>";
					StrTD[VersionID].bgColor = "";
					StrTD[VersionID].innerHTML = "";
				}
				return {"File":FileOut.File, "FileName":FileOut.FileName, "FileExists":1};
			}
			return {"File":FileOut.File, "FileName":FileOut.FileName, "FileExists":0};
		}
		
	return {"File":File, "Version":Version, "EventError":EventError, "NoteError":NoteError};
	} catch (error) {
		if (!EventError.hasOwnProperty("Ошибка запроса файла чертежа ("+error.message+")")) EventError["Ошибка запроса файла чертежа ("+error.message+")"] = "Обратитесь к разработчику инструмента";
	}
}

function GetAssemblyGeometry(StrTD, EventError, NoteError, ApplyIn)
{
try {
	if (typeof(ApplyIn)=="undefined") ApplyIn = true;
		
	var PathGeometry = StrTD[GeometryID].getAttribute("hrefID");
	FileSearch = false;
	PathGeometry = GetFindFile(PathProject, PathReports, PathGeometry, true);
	
	if (PathGeometry) {
		if (FileSearch) {
			var FileFindColor = "#f00000";
			var FileFindIMG = "filefind_search.png";
			var FileFindTitle = "Файл не найден в модели.\nНо найден в экспорте !";
			if (!nax && !nuse && PathProject && !NoteError.hasOwnProperty("Нет 3D-геометрии марки!") && !NoteError.hasOwnProperty("Нет PDF-файла чертежа!")) NoteError["Нет 3D-геометрии марки!"] = "#fdbcb4";
		} else {
			var FileFindColor = "";
			var FileFindIMG = "filefind_3d.png";
			var FileFindTitle = "3D-геометрия марки: "+ObjectNumber;
		}
		
		if (ApplyIn) {
			if (!nuse) {
				StrTD[GeometryID].innerHTML = "<a href='#' onclick='OpenGeometry(\""+ObjectNumber+"\",\""+PathDrawing.File+"\",\""+PathDrawing.Version+"\",\""+PathReport+"\",\""+PathReport0+"\")' target='_blank'><img height='15' src='"+PathIMGMain+"/"+FileFindIMG+"' title='"+FileFindTitle+"' alt='"+ObjectNumber+"' border='0'></a>";
			} else {
				StrTD[GeometryID].innerHTML = "<a href='"+PathGeometry+"' target='_blank' download><img height='15' src='"+PathIMGMain+"/"+FileFindIMG+"' title='"+FileFindTitle+"' alt='"+ObjectNumber+"' border='0'></a>"; // Костыль MSXML не умеет читать кирилицу, беда...
			}
		} else {
			StrTD[GeometryID].innerHTML = "<a href='#' onclick='OpenFile(\""+PathGeometry+"\")' title='"+FileFindTitle+"'><font face='Times' color='"+FileFindColor+"' size='3'><b>"+ObjectNumber+"</b></font></a>";
		}
	} else if (!nax && !nuse && PathProject && !NoteError.hasOwnProperty("Нет 3D-геометрии марки!")) {
		if (ApplyIn) StrTD[GeometryID].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет 3D-геометрии марки!' title='Нет 3D-геометрии марки!'>";
		NoteError["Нет 3D-геометрии марки!"] = "#fdbcb4";
	}
	
	if (ObjectNumber.indexOf("(?)") + 1) {
		if (ApplyIn) {
			StrTD[ObjectNumberID].bgColor = "#fdbcb4";
		} else {
			StrTD[GeometryID].bgColor = "#fdbcb4";
		}
		if (!NoteError.hasOwnProperty("Ошибка нумерации сборки!")) NoteError["Ошибка нумерации сборки!"] = "#fdbcb4";
	}
	
	return {"EventError":EventError, "NoteError":NoteError};
	} catch (error) {
		if (!EventError.hasOwnProperty("Ошибка запроса геометрии сборки ("+error.message+")")) EventError["Ошибка запроса геометрии сборки ("+error.message+")"] = "Обратитесь к разработчику инструмента";
	}
}

function GetPartInside(StrTD, EventError, NoteError, ApplyIn)
{
try {
	if (typeof(ApplyIn)=="undefined") ApplyIn = true;
	
	var PathDXF = StrTD[ContourId].getAttribute("hrefID");	
	FileSearch = false;
	PathDXF = GetFindFile(PathProject, PathReports, PathDXF, true);
	if (PathDXF) {
		if (FileSearch) {
			var FileFindIMG = "filefind_search.png";
			var FileFindTitle = "Файл не найден в модели.\nНо найден в экспорте !";
			if (!NoteError.hasOwnProperty("Нет DXF-файла!")) NoteError["Нет DXF-файла!"] = "#fdbcb4";
		} else {
			var FileFindIMG = "filefind-ok.png";
			var FileFindTitle = "Контур детали: "+ObjectNumber+"";
		}
		
		if (nax && !nuse) PathPDF = PathDrawing;
		
		if (Inside.indexOf("Лист") + 1) {
			StrTD[ContourId].innerHTML = "<a href='"+PathDXF+"' target='_blank' download><img height='15' border='0' src='"+PathIMGMain+"/"+FileFindIMG+"' title='"+FileFindTitle+"' alt='"+ObjectNumber+"'></a>";
		} else {
			StrTD[ContourId].innerHTML = "<a href='"+PathDXF+"' target='_blank' download><img height='15' border='0' src='"+PathIMGMain+"/filefind_prof.png' title='Деталь: "+ObjectNumber+" не ЛИСТ, но имеет DXF-файл, возможно это чертеж...' alt='Деталь: "+ObjectNumber+" не ЛИСТ, но имеет DXF-файл, возможно это чертеж...'></a>";
			StrTD[ContourId].bgColor = "#ff99b8";
		}
	} else if (PathProject) {
		if (Inside.indexOf("Лист") + 1) {
			StrTD[ContourId].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind-no.png' title='Нет DXF-файла!' alt='Нет DXF-файла!'>";
			if (!NoteError.hasOwnProperty("Нет DXF-файла!")) NoteError["Нет DXF-файла!"] = "#fdbcb4";
		} else {
			StrTD[ContourId].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind_prof.png' alt='"+ObjectNumber+"'>";
		}
	}
	
	var PathDSTV = StrTD[GeometryId].getAttribute("hrefID");
	FileSearch = false;
	PathDSTV = GetFindFile(PathProject, PathReports, PathDSTV, true);
	if (PathDSTV) {
		if (FileSearch) {
			var FileFindIMG = "filefind_search.png";
			var FileFindTitle = "Файл не найден в модели.\nНо найден в экспорте !";
			if (!NoteError.hasOwnProperty("Нет NC-файла!")) NoteError["Нет NC-файла!"] = "#fdbcb4";
		} else {
			var FileFindIMG = "filefind-ok.png";
			var FileFindTitle = "ЧПУ-файл детали: "+ObjectNumber+"";
		}
		StrTD[GeometryId].innerHTML = "<a href='"+PathDSTV+"' target='_blank' download><img height='15' border='0' src='"+PathIMGMain+"/"+FileFindIMG+"' title='"+FileFindTitle+"' alt='ЧПУ-файл детали: "+ObjectNumber+"'></a>";
	} else if (PathProject) {
		StrTD[GeometryId].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет NC-файла!' title='Нет NC-файла!'>";
		if (!NoteError.hasOwnProperty("Нет NC-файла!")) NoteError["Нет NC-файла!"] = "#fdbcb4";
	}
	
	var PathPDF = StrTD[DrawingId].getAttribute("hrefID");
	FileSearch = false;
	PathPDF = GetFindFile(PathProject, PathReports, PathPDF, true);
	if (NoteError.hasOwnProperty("б/ч")) {
		StrTD[DrawingId].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind_prof.png' alt='"+ObjectNumber+"'>";
	} else if (PathPDF) {
		if (FileSearch) {
			var FileFindColor = "#f00000";
			var FileFindIMG = "filefind_search.png";
			var FileFindTitle = "Файл не найден в модели.\nНо найден в экспорте !";
			if (!NoteError.hasOwnProperty("Нет PDF-файла!")) NoteError["Нет PDF-файла!"] = "#fdbcb4";
		} else {
			var FileFindColor = "";
			var FileFindIMG = "filefind-ok.png";
			var FileFindTitle = "PDF-файл детали: "+ObjectNumber+"";
		}
		
		StrTD[DrawingId].innerHTML = "<a href='#' onclick='OpenFile(\""+PathPDF+"\")'><img height='15' border='0' src='"+PathIMGMain+"/"+FileFindIMG+"' title='"+FileFindTitle+"' alt='"+ObjectNumber+"'></a>";
		
		StrTD[ObjectNumberID].innerHTML = "<a href='#' onclick='OpenFile(\""+PathPDF+"\")' title='"+FileFindTitle+"'><font face='Times' color='"+FileFindColor+"' size='2'>"+ObjectNumber+"</font></a>";
	} else if (PathProject) {
		StrTD[DrawingId].innerHTML = "<img height='15' src='"+PathIMGMain+"/filefind-no.png' title='Нет PDF-файла!' alt='Нет PDF-файла!'>";
		StrTD[ObjectNumberID].innerHTML = "<font face='Times' size='2' color='#ff0000'>"+ObjectNumber+"</font>";
		if (!NoteError.hasOwnProperty("Нет PDF-файла!")) NoteError["Нет PDF-файла!"] = "#fdbcb4";
	}
	
	if (NoteError.hasOwnProperty("Профиль(?)")) {
		StrTD[InsideID].bgColor = "#fdbcb4";
		if (!NoteError.hasOwnProperty("Ошибка профиля детали!")) NoteError["Ошибка профиля детали!"] = "#fdbcb4";
	} else if (NoteError.hasOwnProperty("Материал(?)")) {
		StrTD[MaterialId].bgColor = "#fdbcb4";
		if (!NoteError.hasOwnProperty("Ошибка материала детали!")) NoteError["Ошибка материала детали!"] = "#fdbcb4";
	}
	
	if (ObjectNumber.indexOf("(?)") + 1) {
		StrTD[ObjectNumberID].bgColor = "#fdbcb4";
		if (!NoteError.hasOwnProperty("Ошибка нумерации детали!")) NoteError["Ошибка нумерации детали!"] = "#fdbcb4";
	}

	return {"EventError":EventError, "NoteError":NoteError};
	} catch (error) {
		if (!EventError.hasOwnProperty("Ошибка запроса файлов детали ("+error.message+")")) EventError["Ошибка запроса файлов детали ("+error.message+")"] = "Обратитесь к разработчику инструмента";
	}
}

function GetTechnicaRequirements()
{
	Objects = GetObjects(PathReport);
	
	var FormTransferFiles = document.getElementById("TransferFiles");
	var FileNameInfo = "Технические требования";
	var TechReq = GetFileIn(document.getElementById("Document").getAttribute("hrefID"));
	var ParentFolder = GetFileIn(TechReq.FileParentFolder);
	var FileOut = GetFindFile(PathProject, PathReports, TechReq.FilePath, true);
	
	var ButMain = document.createElement("input");
	ButMain.type = "submit";
	ButMain.id = "main";
	ButMain.value = "Главная";
	ButMain.title = "";
	ButMain.onclick = function()
	{
		GetMain(PathMain);
	};
	var ButsTransferFilesID = document.getElementById("ButsTransferFiles");
	if (ButsTransferFilesID) {
		ButsTransferFilesID.appendChild(ButMain);
	} else {
		document.getElementById("TransferFiles").appendChild(ButMain);
	}

	
	if (!nax && !nuse) {
		ArrPathTechReq = GoCreateStructure(PathProject,[ParentFolder.ParentName,ParentFolder.ParentName+"/"+ParentFolder.File]);
		if (ArrPathTechReq) {
			if ((PathReport.indexOf(XS_PERF) + 1) && !(PathReport.indexOf(PathExport) + 1) ) {
				this.document.write("<div style='margin-top:10px; margin-left:746px;'>");
				this.document.write("<input type='submit' name='save' value='Сохранить' title='Сохранить в модель: ["+Model+"]'/>");
				this.document.write("<input type='reset' name='del' value='Удалить' title='Удалить из модели: ["+Model+"]'/>");
				this.document.write("</div>");
				
				SaveFile(PathReports+"/"+TechReq.FilePath, FileNameInfo, Model);
				DelFile(PathReports+"/"+TechReq.FilePath, FileNameInfo, Model);
			}
		} else {
			if (!EventError.hasOwnProperty("Ошибка обработки тех. требований")) EventError["Ошибка обработки тех. требований"] = "Обратитесь к разработчику инструмента";
		}
		
		//var DivExportData = document.createElement("div");
		//var IndentExportData = document.createElement("p");
		
		var ButExportData = document.createElement("input");
		ButExportData.type = "submit";
		ButExportData.value = "Экспорт";
		ButExportData.title = "Экспортировать данные и файлы по заказу: ["+Project+"]";
		ButExportData.onclick = function()
		{
			ExportData(Objects.ObjStructure, Objects.ObjReports, Objects.ObjFill);
		};
		
		// Переписать функции save и del c jQuery на чистый javascript
		//IndentExportData.appendChild(ButExportData);
		// var ButSaveText = document.createElement("input");
		// ButSaveText.type = "submit";
		// ButSaveText.name = "save";
		// ButSaveText.value = "Сохранить";
		// ButSaveText.title = "Сохранить в модель: ["+Model+"]";
		// IndentExportData.appendChild(ButSaveText);
		
		// var ButDelText = document.createElement("input");
		// ButDelText.type = "reset";
		// ButDelText.name = "del";
		// ButDelText.value = "Удалить";
		// ButDelText.title = "Удалить bp модели: ["+Model+"]";
		// IndentExportData.appendChild(ButDelText);
		//SendExport.appendChild(IndentExportData);
		if ((PathReport.indexOf(User) + 1) || (PathReport.indexOf(UserID) + 1)) document.getElementById("TransferFiles").appendChild(ButExportData);
		
		if (ArrPathTechReq && !FileOut) {
			if (!EventError.hasOwnProperty("Не удалось прочитать файл \""+FileNameInfo+"\"")) EventError["Не удалось прочитать файл \""+FileNameInfo+"\""] = "Текст загружен из шаблона. Не забудьте СОХРАНИТЬ его после редактирования.";
			FileOut = GetFindFile(GetPath(Resource, false)+"/"+PathTechReq, GetPath(Resource)+"/"+PathTechReq, TechReq.File, true);
			if (!FileOut && !EventError.hasOwnProperty("Ошибка чтения тех. требований")) EventError["Ошибка чтения тех. требований"] = "Обратитесь к разработчику инструмента";
		}
	} else if (!nuse && PathProject) {
		TransferFiles(Objects.Structure, Objects.ObjStructure, Objects.ObjReports, Objects.ObjFill);
		return;
	}
	
	if (FileOut) {
			var GroupTechReq = document.createElement("p");
			var TextTechReq = document.createElement("textarea");
			TextTechReq.id = "TextArea";
			TextTechReq.cols = "118";
			TextTechReq.wrap = "hard";
			GroupTechReq.appendChild(TextTechReq);
			FormTransferFiles.appendChild(GroupTechReq);
		if (!GetTextFile(document.getElementById("TextArea"), FileOut) && !EventError.hasOwnProperty("Ошибка чтения тех. требований")) EventError["Ошибка чтения тех. требований"] = "Обратитесь к разработчику инструмента";
	}
}

function TransferFiles(Structure, ObjStructure, ObjReports, ObjFill)
{
	var FormTransferFiles = document.getElementById("TransferFiles");
	var LabelTransferFiles = document.createElement("div");
	LabelTransferFiles.className = "mark"
	var IndentTransferFiles = document.createElement("p");
	IndentTransferFiles.innerHTML = "<b>Выберите файлы для синхронизации и экспорта:</b>";
	LabelTransferFiles.appendChild(IndentTransferFiles);
	FormTransferFiles.appendChild(LabelTransferFiles);
	
	GetInputStructure(ObjStructure);
	
	function GetInputStructure(ObjIn)
	{
		var SubStructure = ObjIn.info[ObjIn.info.info];
		var ObjOut = new Object();
		function GetKeyStructure(ObjIn,ObjOut)
		{
			for (var i in ObjIn)
			{
				if (typeof(ObjIn[i])=="object") {
					ParentKey = i;
					GetKeyStructure(ObjIn[i],ObjOut);
				} else {
					if (i!="info" && ParentKey!="info" && ObjIn.info!=i) {
						var DivTransferFiles = document.createElement("div");
						DivTransferFiles.className = "file_upload";
						var ButTransferFiles = document.createElement("input");
						var NoteTransferFiles = document.createElement("label");																						
						var Ext = ParentKey.substring(ParentKey.lastIndexOf(ModID)+1,ParentKey.length);
						if (Ext == "DSTV") Ext = "NC1";
						NoteTransferFiles.className = "label";
						NoteTransferFiles.innerHTML = i+" ("+Ext+"-файлы):";
						ButTransferFiles.accept = "."+Ext.toLowerCase();
						ButTransferFiles.type = "file";
						ButTransferFiles.id = ParentKey;
						ButTransferFiles.multiple = "true";
						ButTransferFiles.size = "50";
						ButTransferFiles.name = i;
						// Заменить исключение XML
						if (!GetLoadFile(PathProject, PathReports, ObjIn[i]+SubStructure+"/"+Report.File)) {
							DivTransferFiles.appendChild(NoteTransferFiles);
							DivTransferFiles.appendChild(ButTransferFiles);
							FormTransferFiles.appendChild(DivTransferFiles);
						}
					}
				}
			}
			return ObjOut;
		}
		return GetKeyStructure(ObjIn,ObjOut);
	}
	
	var DivTransferData = document.createElement("div");
	var ButTransferData = document.createElement("input");
	ButTransferData.type = "submit";
	ButTransferData.value = "Синхронизировать";
	ButTransferData.title = "После синхронизации, данные будут доступны только Вам";
	ButTransferData.onclick = function()
	{
		
		TransferData(Structure, ObjStructure, ObjReports, ObjFill);
	};
	DivTransferData.appendChild(ButTransferData);
	
	var ButExportData = document.createElement("input");
	ButExportData.type = "submit";
	ButExportData.value = "Экспортировать";
	ButExportData.title = "После экспорта, данные будут доступны по ссылке\nлюбому пользователю кому Вы передадите ссылку";
	ButExportData.onclick = function()
	{
		ExportData(ObjStructure, ObjReports, ObjFill);
	};
	
	if (!OutReply) DivTransferData.appendChild(ButExportData);
	
	FormTransferFiles.appendChild(DivTransferData);
}

function GetRepository(RepositoryHTML, ApplyIn)
{
	OutExport = false;
	if (typeof(ApplyIn)=="undefined") ApplyIn = false;
	
	if (nax || nuse) {
		Repository = "/"+UserID+"/";
		RepositoryID.innerHTML = "";
	} else if (!ExportType || ExportType == 2) {
		Repository = "/1/";
		var Repo = Repository;
		Repository = GetPathExport(Report.File);
	
		if ((RepositoryHTML.indexOf(Repo) + 1) && (PathReport.indexOf("/"+User+"/") + 1)) {
			RepositoryHTML = RepositoryHTML.substring(0, RepositoryHTML.indexOf(Repo)+4).replace(Repo, Repository);
			if (ApplyIn) {
				var TextNote = " (Экспорт будет производиться по порядку приоритета ("+RepositoryHTML+"), без проверок Чертежей/Марок/Позиций между собой)</br></br>";
			} else {
				var TextNote = RepositoryHTML+" (Проверка отключена)";
			}
			RepositoryID.innerHTML = "<font color='#f00000'><b>НЕ УКАЗАН ТИП ЭКСПОРТА!!!</br></b><font>"+TextNote;
		}
	} else if (ExportType == 3) {
		if ((RepositoryHTML.indexOf("/"+UserID+"/") + 1) || (RepositoryHTML.indexOf("/"+XS_PERF+"/") + 1)) {
			Repository = "/"+XS_PERF+"/";
		}
	} else if (ExportType == 1) {
		Repository = "/0/";
	} else if (ApplyIn && (typeof(RepositoryID) == "undefined" || !RepositoryID)) {
		Repository = RepositoryHTML;
	} else {
		Repository = (typeof(RepositoryID.getElementsByTagName("i")[0].textContent) != "undefined") ? RepositoryID.getElementsByTagName("i")[0].textContent : RepositoryID.getElementsByTagName("i")[0].innerText;
	}
	
	//RepositoryID.innerHTML = Repository;

	if (ExportType) OutExport = GetFindFile(PathExport, PathExport, Reports+Repository+Report.File);
	if (OutExport && !EventError.hasOwnProperty("Репозитория есть в Экспорте!")) EventError["Репозитория есть в Экспорте!"] = OutExport;
	
	return Repository;
}

function GetPathExport(FileIn)
{
	for (var i = GetNumber(Repository.replace(/\//g,"")); GetFindFile(PathExport, PathExport, Reports+Repository+FileIn); i++)
	{
		FileIn = FileIn.replace(Repository, "/"+i+"/");
		Repository = "/"+i+"/";
	}
	
	return Repository;
	
	function GetNumber(ValueIn)
	{
		if (/^(\-|\+)?([0-9]+|Infinity)$/.test(ValueIn)) return Number(ValueIn);
		return NaN;
	}
}