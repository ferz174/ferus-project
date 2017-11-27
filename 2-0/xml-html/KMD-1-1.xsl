<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output indent='yes' method ='html'/>
	<xsl:template match = 'Заказ'>
	<link rel='stylesheet' type='text/css' href='{normalize-space(@Ресурс)}/lib/actevent.css'></link>
	<link rel='stylesheet' type='text/css' href='{normalize-space(@Ресурс)}/lib/xml-html.css'></link>
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
					<xsl:value-of select='normalize-space(Документ/@Название)'/>&#160;<xsl:value-of select='normalize-space(Документ/@Раздел)'/>
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
				<a id='Project' href='{normalize-space(@HTML)}' hrefID='{normalize-space(@Модель)}' UserName='{normalize-space(@UserName)}' title='{normalize-space(@ActID)}' xml0='{normalize-space(Документ/@XML0)}' resource='{normalize-space(@Ресурс)}'>
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
			<table id='DataTable' cellspacing='1' STYLE='border-collapse: collapse; border: 1px solid black;' border='2'>
				<tr bgcolor='#99ccff'>
					<td colspan='7' align='center'>
						<font face='Times'>
							<b>
								<xsl:value-of select='normalize-space(Документ/@Название)'/>&#160;<xsl:value-of select='normalize-space(Документ/@Раздел)'/>
							</b>
						</font>
					</td>
				</tr>
				<tr bgcolor='#99ccff'>
					<td id='Сводка' width='70' align='center'>
						<font face='Times'>
							<b>
								Сводка
							</b>
						</font>
					</td>
					<td id='Текла' width='70' align='center'>
						<font face='Times'>
							<b>
								Текла
							</b>
						</font>
					</td>
					<td id='Номер' width='50' align='center'>
						<font face='Times'>
							<b>
								Номер
							</b>
						</font>
					</td>
					<td id='Лист' width='50' align='center'>
						<font face='Times'>
							<b>
								Лист
							</b>
						</font>
					</td>
					<td id='Листы' width='50' align='center'>
						<font face='Times'>
							<b>
								Листов
							</b>
						</font>
					</td>
					<td width='500' align='center'>
						<font face='Times'>
							<b>
								Название
							</b>
						</font>
					</td>
					<td id='Примечание' width='200' align='center'>
						<font face='Times'>
							<b>
								Примечание
							</b>
						</font>
					</td>
				</tr>
				<xsl:for-each select='Приоритет'>
					<xsl:for-each select='Чертеж'>
						<tr>
							<td align='center'>
								<a href='{normalize-space(@PDF)}' title='{normalize-space(@Чертеж)}' target='_blank'>
									<font face='Times'>
										<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='{normalize-space(@Чертеж)}'/>
									</font>
								</a>
							</td>
							<td align='center' hrefID='{normalize-space(@PDF)}' title='{normalize-space(@Чертеж)}'>
								<a href='{normalize-space(@PDF)}' title='{normalize-space(@Чертеж)}' target='_blank'>
									<font face='Times'>
										<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='{normalize-space(@Чертеж)}'/>
									</font>
								</a>
							</td>
							
							<td align='center'>
								<font face='Times'>
									<b>
										<xsl:value-of select='normalize-space(@Номер)'/>
									</b>
								</font>
							</td>
							<td align='center'>
								<font face='Times'>
									<b>
										<xsl:value-of select='normalize-space(@Лист)'/>
									</b>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='3'>
									<b>
										<xsl:value-of select='normalize-space(@Листов)'/>
									</b>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2' contenteditable='true' title='Доступно исправление текста'>
									<xsl:value-of select='normalize-space(@Название)'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2' contenteditable='true' title='Доступно исправление текста' color='#ffffff'>
									<xsl:value-of select='normalize-space(@Примечание)'/>
								</font>
							</td>
						</tr>
					</xsl:for-each>
				</xsl:for-each>
			</table>
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
					
					PathReport0 = document.getElementById("Project").getAttribute("xml0");
					PathReport0 = GetLoadFile(PathProject, PathReports, PathReport0);
					
					var StrDataTable = document.getElementById("DataTable").getElementsByTagName("tr");
					var HeadDataTable = inidx(StrDataTable[1].getElementsByTagName("td"), "id");
					
					var PathDrawingID = outidx(HeadDataTable, "Текла");
					var DrawingID = outidx(HeadDataTable, "Сводка");
					var NumberDrawingID = outidx(HeadDataTable, "Номер");
					var SheetDrawingID = outidx(HeadDataTable, "Лист");
					var SheetsDrawingID = outidx(HeadDataTable, "Листы");
					var NoteID = outidx(HeadDataTable, "Примечание");
					
					if (!nax && window.attachEvent) {
						var ScrollRows = 0;
						window.onscroll = function()
						{
							ScrollRows = Math.ceil(GetVerticalScroll()/23)-3;
						}
						
						var ScreenRows = GetScreenRows();
						
						GetDataTable(0, ScreenRows);
						
						window.attachEvent('onscroll', function(event)
						{
							GetDataTable(ScrollRows, ScrollRows+ScreenRows);
						});
					
					} else {
						GetDataTable(0, StrDataTable.length);
					}
					
					function GetDataTable(MinIn,MaxIn)
					{
						if (MinIn <= 2) MinIn = 2;
						if (MaxIn >= StrDataTable.length) MaxIn = StrDataTable.length;
						for (var i = MinIn; i < MaxIn; i++)
						{
							var StrTD = StrDataTable[i].getElementsByTagName("td");
							
							var Note = (typeof(StrTD[NoteID].textContent) != "undefined") ? StrTD[NoteID].textContent : StrTD[NoteID].innerText;
							var NoteError = new Object();
							NoteRemove = "Отсутствует";
							//if (Note != "" && !NoteError.hasOwnProperty(Note)) NoteError[Note] = "#ffffff";
							
							GetFileDrawing(StrTD, EventError, NoteError);
							GetNoteError(NoteError, StrTD, NoteID);
						}
						GetEventError(EventError, 0);
					}
				]]>
			</script>
		</body>
	</xsl:template>
</xsl:stylesheet>
