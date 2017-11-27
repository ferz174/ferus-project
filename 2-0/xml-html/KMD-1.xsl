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
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/modules/jquery-latest.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/modules/json3.js'></script>
		<head>
		<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
			<script type='text/javascript'>
				<![CDATA[
					GetEventTime();
				]]>
			</script>
			<title>
				<xsl:value-of select='normalize-space(Документ/@Название)'/>;  Заказ: <xsl:value-of select='normalize-space(@Заказ)'/>
			</title>
		</head>
		<body id='Document' hrefID='{normalize-space(Документ/@TXT)}' document='{normalize-space(Документ/@Документ)}' number='{normalize-space(Документ/@Номер)}'>
			<font face='Times' size='5'>
				<b>
					<xsl:value-of select='normalize-space(Документ/@Название)'/>
				</b>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Номер документа: <xsl:value-of select='normalize-space(@Заказ)'/>-<xsl:value-of select='normalize-space(Документ/@Раздел)'/>
				</b>
			</font>
			<br/>
			<font face='Times'>
				<b>
					№ Заказа: 
				</b>
				<a id='Project' href='{normalize-space(@HTML)}' hrefID='{normalize-space(@Модель)}'  title='{normalize-space(@ActID)}' UserName='{normalize-space(@UserName)}' resource='{normalize-space(@Ресурс)}' repository='{normalize-space(Структура/@Приоритет)}'>
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
			<div id='ExportRepository' title='{normalize-space(@Экспорт)}'></div>
			
			<div id='TransferFiles' action='#' method='POST' enctype='multipart/form-data'></div>
			
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
					PathMain = "";
					
					RepositoryID = document.getElementById("ExportRepository");
					ExportType = Number(RepositoryID.getAttribute("title"));
					Repository = GetRepository(document.getElementById("Project").getAttribute("repository"), true);
					
					PathProject = CreateStructure();
					
					SetLockFile();
					
					GetTechnicaRequirements();
				]]>
			</script>
			<br/>
			
			<table id='DataTable' cellspacing='1' bgcolor='#99ccff' STYLE='border-collapse: collapse; table-layout: fixed; border: 1px solid black;' border='2'>
				<tr height="35">
					<td id='Документ' width='200px' align='center'>
						<font face='Times' size='3'>
							<b>
								Номер документа
							</b>
						</font>
					</td>
					<td id='Название' width='300px' align='center'>
						<font face='Times' size='3'>
							<b>
								Название документа
							</b>
						</font>
					</td>
					<td id='XML' width='100px' align='center'>
						<font face='Times' size='3'>
							<b>
								Исходник
							</b>
						</font>
					</td>
					<td id='CheckXML' width='100px' align='center'>
						<font face='Times' size='3'>
							<b>
								Проверка
							</b>
						</font>
					</td>
					<td id='ConvPDF' width='100px' align='center'>
						<font face='Times' size='3'>
							<b>
								Подготовка
							</b>
						</font>
					</td>
					<td id='PDF' width='100px' align='center'>
						<font face='Times' size='3'>
							<b>
								Итог
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
				<xsl:for-each select='Исходник'>
					<tr height="35" bgcolor='#ffffff'>
						<td align='left'>
							<font face='Times' size='3'>
								<b>
									<xsl:value-of select='normalize-space(/Заказ/@Заказ)'/>-<xsl:value-of select='normalize-space(//Документ/@Раздел)'/>-<xsl:value-of select='normalize-space(@Номер)'/>
								</b>
							</font>
						</td>
						<td align='left'>
							<font face='Times' size='3'>
								<xsl:value-of select='normalize-space(@Название)'/>
							</font>
						</td>
						<td align='center' hrefID='{normalize-space(@XML)}'>
							<a href='{normalize-space(@XML)}' title='{normalize-space(/Заказ/@Заказ)}-{normalize-space(@Исходник)}' target='_blank'>
								<font face='Times' size='3'>
									<img height='25' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='XML-Файл структуры данных из модели'/>
								</font>
							</a>
						</td>
						<td align='center'>
							<font face='Times' size='3'>
								<img height='25' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='Проверка не может быть выполнена'/>
							</font>
						</td>
						<td align='center'>
							<font face='Times' size='3'>
								<img height='25' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='Конвертация не может быть выполнена'/>
							</font>
						</td>
						<td align='center' hrefID='{normalize-space(@PDF)}'>
							<a href='{normalize-space(@PDF)}' title='{normalize-space(/Заказ/@Заказ)}-{normalize-space(@Исходник)}' target='_blank'>
								<font face='Times' size='3'>
									<img height='25' border='0' src='{normalize-space(/Заказ/@Ресурс)}/img/main/file.png' alt='Конструкторский документ в PDF-формате'/>
								</font>
							</a>
						</td>
						<td align='center'>
							<input type='checkbox' title='ОТКЛОНИТЬ !!!'/>
						</td>
					</tr>
				</xsl:for-each>
			</table>
			<script type='text/javascript'>			
				<![CDATA[
					window.onerror = null;
					var StrDataTable = document.getElementById("DataTable").getElementsByTagName("tr");
					var HeadDataTable = inidx(StrDataTable[0].getElementsByTagName("td"), "id");
					
					var NameID = outidx(HeadDataTable, "Название");
					var DocumentID = outidx(HeadDataTable, "Документ");
					var PathXMLID = outidx(HeadDataTable, "XML");
					var PathPDFID = outidx(HeadDataTable, "PDF");
					var CheckXMLID = outidx(HeadDataTable, "CheckXML");
					var ConvPDFID = outidx(HeadDataTable, "ConvPDF");
					var ChekReceiveID = outidx(HeadDataTable, "CheckReceive");
					
					if (window.location.reload) {
						if (!nax) NoteEventAlert("Событие: Важное предупреждение !!!", "Файлы, принадлежащие строкам таблиц, которые будут отмеченны \"галочкой\"  - БУДУТ УДАЛЕНЫ при последующем обновлении страницы (клавиша \"F5\") !!!", false, 30000, "attention", 0);
					}
					
					GetDataTable();
					
					function GetDataTable()
					{
						for (var i = 1; i < StrDataTable.length; ++i)
						{
							var StrTD = StrDataTable[i].getElementsByTagName("td");
							
							var Name = (typeof(StrTD[NameID].textContent) != "undefined") ? StrTD[NameID].textContent.replace(/^\s+/, "").replace(/\s+$/, "") : StrTD[NameID].innerText.replace(/^\s+/, "").replace(/\s+$/, "");
							var Document = (typeof(StrTD[DocumentID].textContent) != "undefined") ? StrTD[DocumentID].textContent.replace(/^\s+/, "").replace(/\s+$/, "") : StrTD[DocumentID].innerText.replace(/^\s+/, "").replace(/\s+$/, "");
							var PathXML = StrTD[PathXMLID].getAttribute("hrefID");
							var PathPDF = StrTD[PathPDFID].getAttribute("hrefID");
							
							PathXML = GetLoadFile(PathProject, PathReports, PathXML);
							if (PathXML) {
								StrTD[PathXMLID].innerHTML = "<a href='"+PathXML+"' target='_blank' title='"+Name+": "+Document+"'><img height='25' border='0' src='"+PathIMGMain+"/filefind-yes.png' alt='"+Document+"'/></a>";
								StrTD[CheckXMLID].innerHTML = "<a href='#' onclick='CheckXML(\""+PathXML+"\")'><img height='25' border='0' src='"+PathIMGMain+"/filecheck.png' alt='Проверка, сравнение и анализ данных XML-файла структуры'/></a>";
								StrTD[ChekReceiveID].getElementsByTagName("input")[0]["checked"] = false;
								if (!nax && !nuse) {
									StrTD[ConvPDFID].innerHTML = "<a href='#' onclick='ConvPDF(\""+PathXML+"\")'><img height='25' border='0' src='"+PathIMGMain+"/fileconv.png' alt='Конвертация XML-файла структуры в PDF'/></a>";
								} else {
									StrTD[ConvPDFID].innerHTML = "<img height='25' border='0' src='"+PathIMGMain+"/filefind-no.png' alt='Конвертация не может быть выполнена' title='Конвертация не может быть выполнена'/>";
								}
							} else {
								StrTD[PathXMLID].innerHTML = "<img height='25' border='0' src='"+PathIMGMain+"/filefind-no.png' alt='Нет файла: "+Document+"' title='Нет файла: "+Document+"'/>";
								StrTD[CheckXMLID].innerHTML = "<img height='25' border='0' src='"+PathIMGMain+"/filefind-no.png' alt='Проверка не может быть выполнена' title='Проверка не может быть выполнена'/>";
								StrTD[ConvPDFID].innerHTML = "<img height='25' border='0' src='"+PathIMGMain+"/filefind-no.png' alt='Конвертация не может быть выполнена' title='Конвертация не может быть выполнена'/>";
								StrTD[ChekReceiveID].getElementsByTagName("input")[0]["checked"] = true;
							}
							
							PathPDF = GetFindFile(PathProject, PathReports, PathPDF, true);
							if (PathPDF) {
								StrTD[PathPDFID].innerHTML = "<a href='#' onclick='OpenFile(\""+PathPDF+"\")' title='"+Name+": "+Document+"' target='_blank'><img height='25' src='"+PathIMGMain+"/filefind-ok.png' border='0' alt='"+Name+": "+Document+"'/></a>";
							} else if (PathProject) {
								StrTD[PathPDFID].innerHTML = "<img height='25' src='"+PathIMGMain+"/filefind-no.png' alt='Нет PDF-файла: "+Document+"' title='Нет PDF-файла: "+Document+"'/>";
							}
							
						}
						
						GetEventError(EventError, 0);					
					}
					
					function CheckXML(PathFile)
					{
						alert("Фукнционал в разработке...");
					}
				]]>
			</script>
		</body>
	</xsl:template>
</xsl:stylesheet>
