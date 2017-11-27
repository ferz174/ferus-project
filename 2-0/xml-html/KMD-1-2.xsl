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
					<td colspan='5' align='center'>
						<font face='Times'>
							<b>
								Чертеж
							</b>
						</font>
					</td>
					<td colspan='6' align='center'>
						<font face='Times'>
							<b>
								<xsl:value-of select='normalize-space(Документ/@Название)'/>
							</b>
						</font>
					</td>
					<td id='CheckReceive' width='40px' align='center'>
						<font face='Times' size='3'>
							<b>
								<img height='25' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/process-no.png' title='ОТКЛОНИТЬ !!!' alt='ОТКЛОНИТЬ !!!'/>
							</b>
						</font>
					</td>
				</tr>
				<tr bgcolor='#99ccff'>
					<td id='Геометрия' width='30' align='center'>
						<font face='Times' size='2'>
							<b>
								3D
							</b>
						</font>
					</td>
					<td id='Сводка' width='50' align='center'>
						<font face='Times' size='2'>
							<b>
								Сводка
							</b>
						</font>
					</td>
					<td id='Текла' width='50' align='center'>
						<font face='Times' size='2'>
							<b>
								Текла
							</b>
						</font>
					</td>
					<td id='Номер' width='40' align='center'>
						<font face='Times' size='2'>
							<b>
								Номер
							</b>
						</font>
					</td>
					<td id='Лист' width='40' align='center'>
						<font face='Times' size='2'>
							<b>
								Лист
							</b>
						</font>
					</td>
					<td id='Марка' width='70' align='center'>
						<font face='Times' size='2'>
							<b>
								Отправ.
									<br/>
								марка
							</b>
						</font>
					</td>
					<td width='220' align='center'>
						<font face='Times' size='2'>
							<b>
								Наименование
							</b>
						</font>
					</td>
					<td width='50' align='center'>
						<font face='Times' size='2'>
							<b>
								Кол.
							</b>
						</font>
					</td>
					<td width='100' align='center'>
						<font face='Times' size='2'>
							<b>
								Вес шт., кг
							</b>
						</font>
					</td>
					<td width='100' align='center'>
						<font face='Times' size='2'>
							<b>
								Вес общ., кг
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
					<td align='center'>
					</td>
				</tr>
				<xsl:for-each select='Приоритет'>
					<xsl:for-each select='Марка'>
					<xsl:sort order='ascending' select='normalize-space(@Марка)'/>
						<tr>
							<td align='center' hrefID='{normalize-space(@PDF)}'>
								<a href='{normalize-space(@PDF)}' title='{normalize-space(@Марка)}' target='_blank'>
									<font face='Times'>
										<img height='15' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='{normalize-space(@Марка)}'/>
									</font>
								</a>
							</td>
							<xsl:for-each select='Чертеж'>
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
							</xsl:for-each>
							<td align='left'>
								<font face='Times' size='2'>
									<b><xsl:value-of select='normalize-space(@Марка)'/></b>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2' contenteditable='true' title='Доступно исправление текста'>
									<xsl:value-of select='normalize-space(@Название)'/>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='2'>
									<xsl:value-of select='normalize-space(@Количество)'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Вес*0.001, "####0.0")'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Вес*@Количество*0.001, "####0.0")'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2' contenteditable='true' title='Доступно исправление текста'>
									<b>
										<xsl:value-of select='normalize-space(@Примечание)'/>
									</b>
								</font>
							</td>
							<td align='center'>
								<input type='checkbox' title='ОТКЛОНИТЬ !!!'/>
							</td>
						</tr>
					</xsl:for-each>
					<tr bgcolor='#979797'>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td align='left'>
							<font face='Times' size='2'>
								<b>ИТОГ:</b>
							</font>
						</td>
						<td align='right'>
							<font face='Times' size='2'>
								<b>
									<xsl:value-of select='(format-number(Итог/@Итог*0.001, "####0.0"))'/>
								</b>
							</font>
						</td>
						<td>
							<font face='Times' size='2' color='#979797'>
								<xsl:value-of select="sum(preceding-sibling::Итог|.)"/>
							</font>
						</td>
						<td align='center'>
							+
						</td>
					</tr>
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
					
					var GeometryID = outidx(HeadDataTable, "Геометрия");
					var ObjectNumberID = outidx(HeadDataTable, "Марка");
					var PathDrawingID = outidx(HeadDataTable, "Текла");
					var DrawingID = outidx(HeadDataTable, "Сводка");
					var NumberDrawingID = outidx(HeadDataTable, "Номер");
					var SheetDrawingID = outidx(HeadDataTable, "Лист");
					var SheetsDrawingID = outidx(HeadDataTable, "Лист");
					var NoteID = outidx(HeadDataTable, "Примечание");
					
					if (window.location.reload && !window.onload) {
						if (!nax && !nuse) {
							NoteEventAlert("Событие: Важное предупреждение !!!", "Файлы, принадлежащие строкам таблиц, которые будут отмеченны \"галочкой\"  - БУДУТ УДАЛЕНЫ при последующем обновлении страницы (клавиша \"F5\") !!!", false, 30000, "attention", 0);
							if (confirm("Принять ")) {
								
							} else {
								//Refresh(0);
							}
						}
					}
					
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
					 
					function GetDataTable(MinIn, MaxIn)
					{
						if (MinIn <= 2) MinIn = 2;
						if (MaxIn >= StrDataTable.length) MaxIn = StrDataTable.length-1;
						for (var i = MinIn; i < MaxIn; i++)
						{
							var StrTD = StrDataTable[i].getElementsByTagName("td");
							
							ObjectNumber = (typeof(StrTD[ObjectNumberID].textContent) != "undefined") ? StrTD[ObjectNumberID].textContent.replace(/^\s+/, "").replace(/\s+$/, "") : StrTD[ObjectNumberID].innerText.replace(/^\s+/, "").replace(/\s+$/, "");

							var Note = (typeof(StrTD[NoteID].textContent) != "undefined") ? StrTD[NoteID].textContent : StrTD[NoteID].innerText;
							var NoteError = new Object();
							NoteRemove = "Отсутствует";
							//if (Note != "" && !NoteError.hasOwnProperty(Note)) NoteError[Note] = "#ffffff";
							
							PathDrawing = GetFileDrawing(StrTD, EventError, NoteError);
							GetAssemblyGeometry(StrTD, EventError, NoteError);
							GetNoteError(NoteError, StrTD, NoteID);
						}
						GetEventError(EventError, 0);
					}
				]]>
			</script>
		</body>
	</xsl:template>
</xsl:stylesheet>
