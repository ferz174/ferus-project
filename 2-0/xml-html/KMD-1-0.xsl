<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output indent='yes' method ='html'/>
	<xsl:template match = 'Заказ'>
	<link rel='stylesheet' type='text/css' href='{normalize-space(@Ресурс)}/lib/actevent.css'></link>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/varglobal.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/pathglobal.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actstructure.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actarray.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actfile.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actwind.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actevent.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actxsl.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actobject.js'></script>
		<head>
		<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
			<script type='text/javascript'>
				<![CDATA[
					GetEventTime();
				]]>
			</script>
			<title>
				<xsl:value-of select='normalize-space(Документ/@Название)'/>; Заказ: <xsl:value-of select='normalize-space(@Заказ)'/>
			</title>
		</head>
		<body id='Document' document='{normalize-space(Документ/@Документ)}' number='{normalize-space(Документ/@Номер)}'>
			<font face='Times' size='5'>
				<b>
					<xsl:value-of select='normalize-space(Документ/@Название)'/>
				</b>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Номер документа: <xsl:value-of select='normalize-space(@Заказ)'/>-<xsl:value-of select='normalize-space(Документ/@Раздел)'/>-<xsl:value-of select='normalize-space(Документ/@Номер)'/>
				</b>
			</font>
			<br/>
			<font face='Times'>
				<b>
					№ Заказа: 
				</b>
				<a id='Project' href='{normalize-space(@HTML)}' hrefID='{normalize-space(@Модель)}' UserName='{normalize-space(@UserName)}' title='{normalize-space(@ActID)}' resource='{normalize-space(@Ресурс)}'>
					<xsl:value-of select='normalize-space(@Заказ)'/>
				</a>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Объект: 
				</b>
				<xsl:value-of select='normalize-space(@Объект)'/>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Ответственный: 
				</b>
				<xsl:value-of select='normalize-space(@Ответственный)'/>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Дата: 
				</b>
				<xsl:value-of select='normalize-space(Документ/@Дата)'/>
			</font>
			<br/>
			<br/>
			<div id='ExportRepository' title='{normalize-space(@Экспорт)}'>
			<font face='Times'>
				<b>
					ПРИОРИТЕТ: 
				</b>
				<i>
					<b>
						<xsl:value-of select='normalize-space(Приоритет/@Приоритет)'/>
					</b>
				</i>
			</font>
			</div>
			<xsl:for-each select='Приоритет'>
				<table id='DataTable' cellspacing='1' bgcolor='#99ccff' width='1200' STYLE='border-collapse: collapse; border: 1px solid black;' border='2'>
					<tr>
						<td id='Номер' width='100' align='center'>
							<font face='Times' size='2'>
								<b>
									Номер
								</b>
							</font>
						</td>
						<td width='200' align='center'>
							<font face='Times' size='2'>
								<b>
									Конструктив<br />(Имя)
								</b>
							</font>
						</td>
						<td id='Состав' width='200' align='center'>
							<font face='Times' size='2'>
								<b>
									Профиль
								</b>
							</font>
						</td>
						<td id='Материал' width='100' align='center'>
							<font face='Times' size='2'>
								<b>
									Материал
								</b>
							</font>
						</td>
						<td width='80' align='center'>
							<font face='Times' size='2'>
								<b>
									Длина,<br />мм
								</b>
							</font>
						</td>
						<td width='80' align='center'>
							<font face='Times' size='2'>
								<b>
									Ширина,<br />мм
								</b>
							</font>
						</td>
						<td width='40' align='center'>
							<font face='Times' size='2'>
								<b>
									Кол.
								</b>
							</font>
						</td>
						<td width='60' align='center'>
							<font face='Times' size='2'>
								<b>
									Вес,<br />кг
								</b>
							</font>
						</td>
						<td id='Примечание' width='200' align='center'>
							<font face='Times' size='2'>
								<b>
									Примечание
								</b>
							</font>
						</td>
						<td id='Чертеж' width='50' align='center'>
							<font face='Times' size='2'>
								<b>
									PDF
								</b>
							</font>
						</td>
						<td id='Контур' width='50' align='center'>
							<font face='Times' size='2'>
								<b>
									DXF
								</b>
							</font>
						</td>
						<td id='Геометрия' width='50' align='center'>
							<font face='Times' size='2'>
								<b>
									NC
								</b>
							</font>
						</td>
					<!--<td width='180' align='center'>
							<font face='Times' size='2'>
								<b>
									Геометрия
								</b>
							</font>
						</td>-->
					</tr>
					<xsl:for-each select='Марка'>
						<tr id='Assemblys' bgcolor='#d1e3f0'>
							<td align='center' hrefID='{normalize-space(@PDF)}'>
								<font face='Times' size='3'>
									<b>
										<xsl:value-of select='normalize-space(@Марка)'/>
									</b>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='2'>
									<b>
										<xsl:value-of select='normalize-space(@Название)'/>
									</b>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='3'>
									<b>
										<xsl:value-of select='normalize-space(Чертеж/@Чертеж)'/>
									</b>
								</font>
							</td>
							<td colspan='3' width='15%' align='center'>
							<!--<font face='Times' size='2'>
									L: <xsl:value-of select='normalize-space(@Длина)'/> 
									W: <xsl:value-of select='normalize-space(@Ширина)'/> 
									H: <xsl:value-of select='normalize-space(@Высота)'/>
								</font>-->
							</td>
							<td align='center'>
								<font face='Times' size='3'>
									<b>
										<xsl:value-of select='normalize-space(@Количество)'/>
									</b>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='3'>
									<b>
										<xsl:value-of select='normalize-space(@Вес)'/>
									</b>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='3'>
									<xsl:value-of select='normalize-space(@Примечание)'/>
								</font>
							</td>
							<td align='center' hrefID='{Чертеж/@PDF}' title='{normalize-space(Чертеж/@Чертеж)}' DrawingID='{normalize-space(Чертеж/@Номер)}'>
								<a href='{normalize-space(@PDF)}' title='{normalize-space(Чертеж/@Чертеж)}' target='_blank'>
									<font face='Times' size='2'>
										<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='PDF-Файл данных из модели'/>
									</font>
								</a>
							</td>
							<td align='center' DrawingID='{normalize-space(Чертеж/@Лист)}'></td>
							<td align='center' DrawingID='{normalize-space(Чертеж/@Листов)}'></td>
						<!--<td align='center'></td>-->
						<!--<td align='center'></td>-->
						</tr>
							<xsl:for-each select='Позиция'>
								<tr id='Parts' bgcolor='#ffffff'>
									<td align='center' hrefID='{normalize-space(@PDF)}'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(@Позиция)'/>
										</font>
									</td>
									<td align='left'>
										<font face='Times' size='2' contenteditable='true' title='Доступно исправление текста'>
											<xsl:value-of select='normalize-space(@Название)'/>
										</font>
									</td>
									<td align='left'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(Профиль/@Профиль)'/>
										</font>
									</td>
									<td align='left'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(Профиль/@Материал)'/>
										</font>
									</td>
									<td align='right'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(@Длина)'/>
										</font>
									</td>
									<td align='right'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(@Ширина)'/>
										</font>
									</td>
									<td align='center'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(@Количество)'/>
										</font>
									</td>
									<td align='right'>
										<font face='Times' size='2'>
											<xsl:value-of select='format-number(@Вес*@Количество, "####0.0")'/>
										</font>
									</td>
									<td align='center'>
										<font face='Times' size='2'>
											<xsl:value-of select='normalize-space(@Примечание)'/>
										</font>
									</td>
									<td align='center' hrefID='{normalize-space(@PDF)}'>
										<a href='{normalize-space(@PDF)}' title='{normalize-space(@Позиция)}' target='_blank'>
											<font face='Times' size='2'>
												<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='PDF-Файл данных из модели'/>
											</font>
										</a>
									</td>
									<td align='center' hrefID='{normalize-space(@DXF)}'>
										<a href='{normalize-space(@DXF)}' title='{normalize-space(@Позиция)}' target='_blank' download='true'>
											<font face='Times' size='2'>
												<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='DXF-Файл данных из модели'/>
											</font>
										</a>
									</td>
									<td align='center' hrefID='{normalize-space(@DSTV)}'>
										<a href='{normalize-space(@DSTV)}' title='{normalize-space(@Позиция)}' target='_blank' download='true'>
											<font face='Times' size='2'>
												<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='ЧПУ-файл детали: {normalize-space(@Позиция)}'/>
											</font>
										</a>
									</td>
									<!--<td align='left'>
										<font face='Times' size='2'>
										<xsl:if test='normalize-space(Профиль/Отверстие)'>
											<xsl:value-of select='normalize-space(Профиль/Отверстие/@Количество)'/>отв. &#8709; <xsl:value-of select='normalize-space(Профиль/Отверстие/@Отверстие)'/>мм
										</xsl:if>
										</font>
									</td>-->
								</tr>
							</xsl:for-each>
					</xsl:for-each>
				</table>
			</xsl:for-each>
			
			<script type='text/javascript'>
				<![CDATA[
					PathReport = document.location.href;
					Report = GetFileIn(PathReport);
					PathReports = Report.FileParentFolder;
					
					ActID = document.getElementById("Project").getAttribute("title");
					UserName = document.getElementById("Project").getAttribute("UserName");
					UserID = UserName+ModID+ActID;
					Chapter = document.getElementById("Document").getAttribute("document").replace(document.getElementById("Document").getAttribute("number"),"");
					
					Model = document.getElementById("Project").getAttribute("hrefID");
					Project = (typeof(document.getElementById("Project").textContent) != "undefined") ? document.getElementById("Project").textContent : document.getElementById("Project").innerText;
					Resource = document.getElementById("Project").getAttribute("resource");
					if (nax && (Resource.indexOf("http:") + 1)) {
						Resource = GetPath(Resource, false);
					} else {	
						Resource = GetPath(Resource);
					}
					
					PathIMGMain = Resource+"/"+PathIMGMain;
					PathExport = Resource+"/"+PathExport+"/"+Project;
					PathConsol = Resource+"/"+PathConsol+"/"+Project;
					FilesConsol = GetFilesFolder(PathConsol);
					
					RepositoryID = document.getElementById("ExportRepository");
					ExportType = Number(RepositoryID.getAttribute("title"));
					Repository = GetRepository(RepositoryID.innerHTML);
					
					PathProject = CreateStructure();					
					
					var StrDataTable = document.getElementById("DataTable").getElementsByTagName("tr");
					var HeadDataTable = inidx(StrDataTable[0].getElementsByTagName("td"), "id");
					
					var ObjectNumberID = outidx(HeadDataTable, "Номер");
					var InsideID = outidx(HeadDataTable, "Состав");
					var MaterialId = outidx(HeadDataTable, "Материал");
					var DrawingId = outidx(HeadDataTable, "Чертеж");
					var ContourId = outidx(HeadDataTable, "Контур");
					var GeometryId = outidx(HeadDataTable, "Геометрия");
					var NoteId = outidx(HeadDataTable, "Примечание");

					GetDataTable();
					
					function GetDataTable()
					{
						for (var i = 1; i < StrDataTable.length; i++)
						{
							var StrTD = StrDataTable[i].getElementsByTagName("td");
							
							ObjectNumber = (typeof(StrTD[ObjectNumberID].textContent) != "undefined") ? StrTD[ObjectNumberID].textContent.replace(/^\s+/, "").replace(/\s+$/, "") : StrTD[ObjectNumberID].innerText.replace(/^\s+/, "").replace(/\s+$/, "");
							Inside = (typeof(StrTD[InsideID].textContent) != "undefined") ? StrTD[InsideID].textContent : StrTD[InsideID].innerText;
							
							if (StrDataTable[i].id == "Assemblys") {
								DrawingID = InsideID;
								PathDrawingID = DrawingId-2;
								NumberDrawingID = DrawingId-2;
								SheetDrawingID = DrawingId-1;
								SheetsDrawingID = DrawingId;
								VersionID = MaterialId;
								GeometryID = ObjectNumberID;
								
								var NoteID = NoteId-2;
								var Note = (typeof(StrTD[NoteID].textContent) != "undefined") ? StrTD[NoteID].textContent.replace(/^\s+/, "").replace(/\s+$/, "") : StrTD[NoteID].innerText.replace(/^\s+/, "").replace(/\s+$/, "");
								var NoteError = new Object();
								NoteRemove = "Отсутствует";
								NoteError[Note] = "#d1e3f0";
								
								PathDrawing = GetFileDrawing(StrTD,EventError,NoteError,false);
								GetAssemblyGeometry(StrTD,EventError,NoteError,false);
								GetNoteError(NoteError,StrTD,NoteID);
							} else if (StrDataTable[i].id == "Parts") {
								var Note = (typeof(StrTD[NoteId].textContent) != "undefined") ? StrTD[NoteId].textContent.replace(/^\s+/, "").replace(/\s+$/, "") : StrTD[NoteId].innerText.replace(/^\s+/, "").replace(/\s+$/, "");
								var NoteError = new Object();
								NoteError[Note] = "#ffffff";
								
								GetPartInside(StrTD, EventError, NoteError);
								
								if (PathDrawing.NoteError.hasOwnProperty(NoteRemove)) {
									StrTD[NoteId].parentElement.style.textDecoration = "line-through";
									StrTD[NoteId].parentElement.style.Color = "#c3c3c3";
									NoteError[NoteRemove] = "";
								}
								
								GetNoteError(NoteError, StrTD, NoteId);
							}
						}
						GetEventError(EventError, 0);
					}
				]]>
			</script>

			</body>
	</xsl:template>
</xsl:stylesheet>
