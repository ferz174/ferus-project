function GetVarMain(PathReport)
{
try {
	var ObjReport = GetObject(PathReport);
	if (!ObjReport) return false;
	var ObjectAttribute = ObjReport.info;
	
	ModelText = "Модель";
	Model = (!npro) ? ObjectAttribute.GetValueMSXML(ModelText) : GetValueMSXML(ObjectAttribute[ModelText]);
	ProjectText = "Заказ";
	Project = (!npro) ? ObjectAttribute.GetValueMSXML(ProjectText) : GetValueMSXML(ObjectAttribute[ProjectText]);
	ResourceText = "Ресурс";
	Resource = (!npro) ? ObjectAttribute.GetValueMSXML(ResourceText) : GetValueMSXML(ObjectAttribute[ResourceText]);
	ExportType = (!npro) ? ObjectAttribute.GetValueMSXML("Экспорт") : GetValueMSXML(ObjectAttribute["Экспорт"]);
		
	ActID = ObjectAttribute.ActID;
	UserName = ObjectAttribute.UserName;
	UserID = UserName+ModID+ActID;

	Report = GetFileIn(PathReport);
	PathReports = Report.FileParentFolder;
	PathProject = CreateStructure(PathReports, Model);
	PathIMGMain = Resource+"/"+PathIMGMain;
	PathExport = Resource+"/"+PathExport+"/"+Project;
	
	PathConsol = Resource+"/"+PathConsol+"/"+Project;
	return ObjReport;
} catch (error) {
	return error instanceof ReferenceError;
}
}

function Head(ObjReport)
{
try {
	this.document.write("<head>");
	this.document.write("<title>");
	this.document.write("Спецификация марки: "+Assembly+"; "+ProjectText+": "+Project);
	this.document.write("</title>");
	this.document.write("</head>");
	
	this.document.write("<font face='Times' size='5'><b>Спецификация марки: "+Assembly+"</b></font>");
	this.document.write("<br/>");

	this.document.write("<font face='Times'><b>Номер документа: "+Project+"-"+ObjReport[Report.FileName].info.GetValueMSXML("Раздел")+"-"+ObjReport[Report.FileName].info.GetValueMSXML("Номер")+"</b></font>");
	this.document.write("<br/>");
	this.document.write("<font face='Times'><b>№ Заказа: </b>"+Project+"</font>");
	this.document.write("<br/>");
	var ObjectText = "Объект";
	this.document.write("<font face='Times'><b>"+ObjectText+": </b>"+ObjReport.info.GetValueMSXML(ObjectText)+"</font>");
	this.document.write("<br/>");
	var DeveloperText = "Ответственный";
	this.document.write("<font face='Times'><b>"+DeveloperText+": </b>"+ObjReport.info.GetValueMSXML(DeveloperText)+"</font>");
	this.document.write("<br/>");
	var DateText = "Дата";
	this.document.write("<font face='Times'><b>"+DateText+": </b>"+ObjReport[Report.FileName].info.GetValueMSXML(DateText)+"</font>");
	this.document.write("<br/><br/>");
} catch (error) {
	return error instanceof ReferenceError;
}
}

function GetObjInside(Assembly, ObjReport)
{
	RepositoryID = "";
	for (var i in ObjReport)
	{
		if (i == "info" || i == Report.FileName) continue;
		ObjAssemblys = ObjReport[i];
		Repository = GetRepository(i, true);
	}
	
	var ObjAssembly = ObjAssemblys[Assembly];
	
	PathGeometry = ObjAssembly.info.PDF;
	PathGeometry = GetFindFile(PathProject, PathReports, PathGeometry);
	if (PathGeometry) {
		if (!nax && !(PathGeometry.indexOf("http:") + 1)) PathGeometry = GetTempFile(PathGeometry).replace(/\//g,"\\");
	} else if (!EventError.hasOwnProperty("Нет файла геометрии сборки")) {
		EventError["Нет файла геометрии сборки"] = "Обратитесь к разработчику инструмента";
	}
	
	for (var i in ObjAssembly)
	{
		if (i == "info") continue;
		if (ObjAssembly[i].info.info.toUpperCase() == "ЧЕРТЕЖ") ObjDrawing.info = ObjAssembly[i].info;
		if (ObjAssembly[i].info.info.toUpperCase() == "ПОЗИЦИЯ") ObjParts[i] = ObjAssembly[i];
	}
	
	return {"ObjAssembly":ObjAssembly,"ObjDrawing":ObjDrawing,"ObjParts":ObjParts};
}
	
function TechReq(ObjDrawing)
{
	var FileNameInfo = "Технические требования";
	
	if (GetFindFile(PathProject,PathReports,ObjDrawing.info.TXT)) {
		var TextFile = GetTextFile(Report.FileParentFolder+"/"+ObjDrawing.info.TXT);
		this.document.write("<textarea id='TechReqText' cols='134' rows='"+TextFile.TextRows+"' wrap='hard'>"+TextFile.Text+"</textarea>");
	} else {
		if (!EventError.hasOwnProperty("Нет файла \""+FileNameInfo+"\"")) EventError["Нет файла \""+FileNameInfo+"\""] = "Обратитесь к разработчику чертежа или к чертежу в сводке";
		this.document.write("<textarea id='TechReqText' cols='134' rows='2' wrap='hard' disabled='true'>Нет файла \""+FileNameInfo+"\" для данного чертежа (марки).\nОбратитесь к разработчику чертежа или к чертежу в сводке</textarea>");
	}
	
	this.document.write("<br/>");
	
	if (ConsolDrawing != 0 && Version) {
		if (!EventError.hasOwnProperty("Чертеж с ручным изм. <b>"+Version+"</b>. Обратитесь к чертежу в сводке")) EventError["Чертеж с ручным изм. <b>"+Version+"</b>. Обратитесь к чертежу в сводке"] = "Состав марки может не соотвествовать представленной спецификации!!!";
		this.document.write("<font face='Times' size='4' color='#f00000'>Внимание!!! Чертеж с ручным изм. <b>"+Version+"</b>. Обратитесь к чертежу в сводке. Состав марки может не соотвествовать представленной спецификации.</font>");
		this.document.write("<br/>");
	}
}

function HeadDataTable(Assembly)
{
	this.document.write("<br/>");
	//var GroupAssID = ObjAssemblys.info.info;
	//this.document.write("<font face='Times'><b>ПРИОРИТЕТ: </b>"+ObjAssemblys.info[GroupAssID]+"</font>");
	this.document.write("<font face='Times'><b>ПРИОРИТЕТ: </b>"+Assembly+"</font>");
	this.document.write("<br/>");
	
	this.document.write("<table id='DataTable' cellspacing='1' bgcolor='#99ccff' width='1100' STYLE='border-collapse: collapse; border: 1px solid black;' border='2'>");
	this.document.write("<tr>");
	this.document.write("<td id='Номер' width='60' align='center'><font face='Times' size='2'><b>Номер</b></font></td>");
	this.document.write("<td width='200' align='center'><font face='Times' size='2'><b>Конструктив<br />(Имя)</b></font></td>");
	this.document.write("<td id='Профиль' width='200' align='center'><font face='Times' size='2'><b>Профиль</b></font></td>");
	this.document.write("<td id='Материал' width='100' align='center'><font face='Times' size='2'><b>Материал</b></font></td>");
	this.document.write("<td width='80' align='center'><font face='Times' size='2'><b>Длина,<br />мм</b></font></td>");
	this.document.write("<td width='80' align='center'><font face='Times' size='2'><b>Ширина,<br />мм</b></font></td>");
	this.document.write("<td width='40' align='center'><font face='Times' size='2'><b>Кол.</b></font></td>");
	this.document.write("<td width='60' align='center'><font face='Times' size='2'><b>Вес,<br />кг</b></font></td>");
	this.document.write("<td id='Примечание' width='200' align='center'><font face='Times' size='2'><b>Примечание</b></font></td>");
	this.document.write("<td id='Чертеж' width='30' align='center'><font face='Times' size='2'><b>PDF</b></font></td>");
	this.document.write("<td id='Контур' width='30' align='center'><font face='Times' size='2'><b>DXF</b></font></td>");
	this.document.write("<td id='Геометрия' width='30' align='center'><font face='Times' size='2'><b>NC</b></font></td>");
	this.document.write("</tr>");
}

function DataTable(Assembly, ObjAssembly, ObjDrawing, ObjParts)
{
	HeadDataTable(Assembly);
	var Assembly = ObjAssembly.info;
	var ObjectNumber = Assembly.GetValueMSXML("Марка");
	var Note = Assembly.GetValueMSXML("Примечание");
	var Drawing = ObjDrawing.info.GetValueMSXML("Чертеж");
	var PathDrawing = ObjDrawing.info.PDF;
	var NumberDrawing = ObjDrawing.info.GetValueMSXML("Номер");
	var SheetDrawing = ObjDrawing.info.GetValueMSXML("Лист");
	var SheetsDrawing = ObjDrawing.info.GetValueMSXML("Листов");
	
	var NoteError = new Object();
	NoteError[Note] = "#d1e3f0";
	NoteRemove = "Отсутствует";
	
	this.document.write("<tr id='Assembly"+ModID+ObjectNumber+"' bgcolor='#d1e3f0'>");
	if (ObjectNumber.indexOf("(?)") + 1) {
		this.document.write("<td align='center' bgColor='#fdbcb4'><font face='Times' size='3'><b>"+ObjectNumber+"</b></td>");
		if (!NoteError.hasOwnProperty("Ошибка нумерации сборки!")) NoteError["Ошибка нумерации сборки!"] = "#fdbcb4";
	} else if (PathGeometry) {
		this.document.write("<td align='center'><font face='Times' size='3'><a href='#' onclick='OpenFile(\""+PathGeometry+"\")' title='"+ObjectNumber+"'><b>"+ObjectNumber+"</b></a></font></td>");
	} else {
		this.document.write("<td align='center'><font face='Times' size='3'><b>"+ObjectNumber+"</b></td>");
		if (!nax && !nuse && NoteError.hasOwnProperty("Нет 3D-файла геометрии!")) NoteError["Нет 3D-файла геометрии!"] = "#fdbcb4";
	}
	
	this.document.write("<td align='center'><font face='Times' size='2'><b>"+Assembly.GetValueMSXML("Название")+"</b></font></td>");
	
	if (SheetDrawing.indexOf("(?)") + 1) {
		PathDrawing = false;
		if (!NoteError.hasOwnProperty("Ошибка нумерации чертежа!")) NoteError["Ошибка нумерации чертежа!"] = "#fdbcb4";
	} else if (NumberDrawing.indexOf("(?)") + 1) {
		PathDrawing = false;
		if (!NoteError.hasOwnProperty("Нет чертежа в модели!")) NoteError["Нет чертежа в модели!"] = "#ff99b8";
	}
		
	if (PathDrawing) PathDrawing = GetFindFile(PathProject,PathReports,PathDrawing);	
	
	if (ConsolDrawing != 0) {
		ConsolDrawing = GetFindFile(PathProject,PathConsol,ConsolDrawing,false);
	} else {
		ConsolDrawing = false;
	}
	
	if (NoteError.hasOwnProperty("Нет чертежа в модели!")) {
		this.document.write("<td colspan='4' align='center'><font face='Times' size='3' color='#f00000'>Нет чертежа в модели!</font></td>");
	} else if (ConsolDrawing) {
		if (Version) {
			this.document.write("<td colspan='2' align='center'><font face='Times' size='3'>Чертеж в сводке: <a href='#' onclick='OpenFile(\""+ConsolDrawing+"\")'><b>"+Drawing+"</b></a></font></td>");
			this.document.write("<td colspan='2' align='center' bgColor = '#fdbcb4'><font face='Times' size='3'>С ручным изм. <b>"+Version+"</b> !!!</font></td>");
		} else {
			this.document.write("<td colspan='4' align='center'><font face='Times' size='3'>Чертеж в сводке: <a href='#' onclick='OpenFile(\""+ConsolDrawing+"\")'><b>"+Drawing+"</b></a></font></td>");
		}
	} else {
		this.document.write("<td colspan='4' align='center'><font face='Times' size='3' color='#f00000'>Нет PDF-файла чертежа: <b>"+Drawing+"</b> в cводке !!!</font></td>");
		if (!EventError.hasOwnProperty("Нет PDF-файла чертежа \""+Drawing+"\" в cводке")) EventError["Нет PDF-файла чертежа \""+Drawing+"\" в cводке"] = "Обратитесь к разработчику чертежа";
		
		if (!PathDrawing) {
			if (!NoteError.hasOwnProperty("Нет PDF-файла чертежа!")) NoteError["Нет PDF-файла чертежа!"] = "#fdbcb4";
			if (!ConsolDrawing && !NoteError.hasOwnProperty(NoteRemove)) NoteError[NoteRemove] = "";
		}
	}
	
	//this.document.write("<td align='center'><!--<font face='Times' size='2'>L: "+Assembly.GetValueMSXML("Длина")+"W: "+Assembly.GetValueMSXML("Ширина")+"H: "+Assembly.GetValueMSXML("Высота")+"</font>--></td>");
	this.document.write("<td align='center'><font face='Times' size='3'><b>"+Assembly.GetValueMSXML("Количество")+"</font></td>");
	this.document.write("<td align='right'><font face='Times' size='3'><b>"+Assembly.GetValueMSXML("Вес")+"</b></font></td>");
	
	if (NoteError.hasOwnProperty(NoteRemove)) {
		var TrAssembly = document.getElementById("Assembly"+ModID+ObjectNumber);
		TrAssembly.style.color = "#c3c3c3";
		TrAssembly.style.textDecoration = "line-through";
		this.document.write("<td align='center' bgColor='#d1e3f0'><font face='Times' size='3'>Отсутствует</font></td>");
	} else {
		var ArrNoteError = new Array();
		for (var i in NoteError)
		{
			ArrNoteError.push(i);
		}
		
		if (ArrNoteError.length == 1) {
			this.document.write("<td align='center'><font face='Times' size='3'>"+ArrNoteError[ArrNoteError.length-1]+"</font></td>");
		} else {
			this.document.write("<td align='center' bgColor='#fdbcb4'><font face='Times' size='3'>"+ArrNoteError[ArrNoteError.length-1]+"</font></td>");
		}
	}
	
	if (PathDrawing) {
		this.document.write("<td align='center'><font face='Times' size='3'><a href='#' onclick='OpenFile(\""+PathDrawing+"\")'><img height='15' border='0' src='"+PathIMGMain+"/filefind-yes.png' alt='"+Drawing+"' title='"+Drawing+"'></a></font></td>");
	} else {
		this.document.write("<td align='center'><img height='15' src='"+PathIMGMain+"/drawtekla-no.png' alt='Нет PDF-файла чертежа!' title='Нет PDF-файла чертежа!'></td>");
	}
	
	this.document.write("<td align='center'><font face='Times' size='3'></font></td>");
	this.document.write("<td align='center'><font face='Times' size='3'></font></td>");
	
	GetParts(ObjParts,NoteError);
	
	this.document.write("</tr>");
}

function GetParts(ObjParts,NoteError)
{
	var Parts = false;
	for (var i in ObjParts)
	{
		if (i == "info") continue;
		this.document.write("<tr id='Part"+ModID+i+"' bgcolor='#ffffff'>");
		
		var Parts = true;
		var Part = ObjParts[i].info;
		var ObjectNumber = Part.GetValueMSXML("Позиция");
		var PathPDF = Part.PDF;
		PathPDF = GetFindFile(PathProject,PathReports,PathPDF);
		var PathDXF = Part.DXF;
		PathDXF = GetFindFile(PathProject,PathReports,PathDXF);
		var PathDSTV = Part.DSTV;
		PathDSTV = GetFindFile(PathProject,PathReports,PathDSTV);
		
		if (NoteError.hasOwnProperty(NoteRemove)) {
			var NoteError = new Object();
			NoteError[NoteRemove] = "";
		} else {
			var NoteError = new Object();
		}
		
		NoteError[Part.GetValueMSXML("Примечание")] = "#ffffff";
		
		if (ObjectNumber.indexOf("(?)") + 1) {
			this.document.write("<td align='center'><font face='Times' size='2'><img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет PDF-файла чертежа!' title='Нет PDF-файла чертежа!'></font></td>");
			this.document.write("<td align='center' bgColor='#fdbcb4'><font face='Times' size='2' color='#f00000'>"+ObjectNumber+"</font></td>");
			if (!NoteError.hasOwnProperty("Ошибка нумерации детали!")) NoteError["Ошибка нумерации детали!"] = "#fdbcb4";
		} else if (PathPDF) {
			this.document.write("<td align='center'><font face='Times' size='2'><a href='#' onclick='OpenFile(\""+PathPDF+"\")' title='"+Part.Чертеж+"'>"+ObjectNumber+"</a></font></td>");
		} else {
			this.document.write("<td align='center'><font face='Times' size='2' color='#f00000'>"+ObjectNumber+"</font></td>");
			if (!NoteError.hasOwnProperty("Нет PDF-файла!")) NoteError["Нет PDF-файла!"] = "#fdbcb4";
		}
		
		this.document.write("<td align='left'><font face='Times' size='2' contenteditable='true' title='Доступно исправление текста'>"+Part.GetValueMSXML("Название")+"</font></td>");
		
		for (var j in ObjParts[i])
		{
			if (j == "info") continue;
			if (ObjParts[i][j].info.info.toUpperCase() == "ПРОФИЛЬ"){
				var Profile = ObjParts[i][j].info.GetValueMSXML("Профиль");
				var Plate = Profile.indexOf("Лист") + 1;
				var Material = ObjParts[i][j].info.GetValueMSXML("Материал");
				
				if (NoteError.hasOwnProperty("Профиль(?)")) {
					this.document.write("<td align='left' bgColor='#fdbcb4'><font face='Times' size='2'>"+Profile+"</font></td>");
					if (!NoteError.hasOwnProperty("Ошибка профиля детали!")) NoteError["Ошибка профиля детали!"] = "#fdbcb4";
				} else {
					this.document.write("<td align='left'><font face='Times' size='2'>"+Profile+"</font></td>");
				}
				
				if (NoteError.hasOwnProperty("Материал(?)")) {
					this.document.write("<td align='left' bgColor='#fdbcb4'><font face='Times' size='2'>"+Material+"</font></td>");
					if (!NoteError.hasOwnProperty("Ошибка материала детали!")) NoteError["Ошибка материала детали!"] = "#fdbcb4";
				} else {
					this.document.write("<td align='left'><font face='Times' size='2'>"+Material+"</font></td>");
				}
			}
		}
		
		if (!PathDXF && Plate && !NoteError.hasOwnProperty("Нет DXF-файла!")) NoteError["Нет DXF-файла!"] = "#fdbcb4";
		if (!PathDSTV && !NoteError.hasOwnProperty("Нет NC-файла!")) NoteError["Нет NC-файла!"] = "#fdbcb4";
		
		this.document.write("<td align='right'><font face='Times' size='2'>"+Part.GetValueMSXML("Длина")+"</font></td>");
		this.document.write("<td align='right'><font face='Times' size='2'>"+Part.GetValueMSXML("Ширина")+"</font></td>");
		this.document.write("<td align='center'><font face='Times' size='2'>"+Part.GetValueMSXML("Количество")+"</font></td>");
		this.document.write("<td align='right'><font face='Times' size='2'>"+(Part.GetValueMSXML("Количество")*Part.GetValueMSXML("Вес")).toFixed(1)+"</font></td>");
		
		
		if (NoteError.hasOwnProperty(NoteRemove)) {
			var TrParts = document.getElementById("Part"+ModID+i);
			TrParts.style.color = "#c3c3c3";
			TrParts.style.textDecoration = "line-through";
			this.document.write("<td align='center' bgColor='#ffffff'><font face='Times' size='3'>Отсутствует</font></td>");
		} else {
			var ArrNoteError = new Array();
			for (var k in NoteError)
			{
				ArrNoteError.push(k);
			}
			
			if (ArrNoteError.length == 1) {
				this.document.write("<td align='center'><font face='Times' size='3'>"+ArrNoteError[ArrNoteError.length-1]+"</font></td>");
			} else {
				this.document.write("<td align='center' bgColor='#fdbcb4'><font face='Times' size='3'>"+ArrNoteError[ArrNoteError.length-1]+"</font></td>");
			}
		}
		
		if (PathPDF) {
			this.document.write("<td align='center'><font face='Times' size='3'><a href='#' onclick='OpenFile(\""+PathPDF+"\")'><img height='15' border='0' src='"+PathIMGMain+"/filefind-ok.png' alt='"+Part.GetValueMSXML("Чертеж")+"' title='"+Part.GetValueMSXML("Чертеж")+"'></a></font></td>");
		} else {
			this.document.write("<td align='center'><img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет PDF-файла! title='Нет PDF-файла!'></td>");
		}
		
		if (PathDXF && Plate) {
			this.document.write("<td align='center'><font face='Times' size='3'><a href='#' onclick='OpenFile(\""+PathDXF+"\")' title='"+ObjectNumber+"'><img height='15' border='0' src='"+PathIMGMain+"/filefind_dxf.png' alt='"+ObjectNumber+"'></a></font></td>");
		} else if (PathDXF && !Plate) {
			this.document.write("<td align='center' bgColor='#ff99b8'><font face='Times' size='3'><a href='#' onclick='OpenFile(\""+PathDXF+"\")' title='Деталь: "+ObjectNumber+" не ЛИСТ, но имеет DXF-файл, возможно это чертеж...'><img height='15' border='0' src='"+PathIMGMain+"/filefind_prof.png'></a></font></td>");
		} else if (!PathDXF && !Plate) {
			this.document.write("<td align='center'><font face='Times' size='3'><img height='15' border='0' src='"+PathIMGMain+"/filefind_prof.png' alt='"+ObjectNumber+"' title='"+ObjectNumber+"'></font></td>");
		} else {
			this.document.write("<td align='center'><img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет DXF-файла!' title='Нет DXF-файла!'></td>");
		}
		
		if (PathDSTV) {
			this.document.write("<td align='center'><font face='Times' size='3'><a href='#' onclick='OpenFile(\""+PathDSTV+"\")' title='"+ObjectNumber+"'><img height='15' border='0' src='"+PathIMGMain+"/filefind-ok.png' alt='"+ObjectNumber+"'></a></font></td>");
		} else {
			this.document.write("<td align='center'><img height='15' src='"+PathIMGMain+"/filefind-no.png' alt='Нет NC-файла!'></td>");
		}
	
		this.document.write("</tr>");
	}
	
	if (!Parts) {
		this.document.write("<tr bgcolor='#ffffff'>");
		if (!EventError.hasOwnProperty("Нет спецификации марки \""+Assembly+"\"")) EventError["Нет спецификации марки \""+Assembly+"\""] = "Обратитесь к разработчику чертежа";
		this.document.write("<td colspan='12' align='center'><font face='Times' size='3' color='#f00000'><b>Нет спецификации марки: "+Assembly+". Обратитесь к разработчику чертежа.</font></td>");
	}
}
