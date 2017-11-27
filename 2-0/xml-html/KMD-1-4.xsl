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
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actobject.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actwind.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/actevent.js'></script>
	<script charset='utf-8' src='{normalize-space(@Ресурс)}/lib/jquery-latest.js'></script>
		<head>
		<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
			<script type='text/javascript'>
				<![CDATA[
					GetEventTime();
				]]>
			</script>
			<title>
				<xsl:value-of select='Документ/@Название'/>; Заказ: <xsl:value-of select='@Заказ'/>
			</title>
		</head>
		<body>
			<font face='Times' size='5'>
				<b>
					<xsl:value-of select='Документ/@Название'/>
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
				<a id='Project' href='{@HTML}' hrefID='{@Модель}' UserName='{@UserID}' title='{@ActID}' resource='{normalize-space(@Ресурс)}'>
					<xsl:value-of select='@Заказ'/>
				</a>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Объект: 
				</b>
				<xsl:value-of select='@Объект'/>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Ответственный: 
				</b>
				<xsl:value-of select='@Ответственный'/>
			</font>
			<br/>
			<font face='Times'>
				<b>
					Дата: 
				</b>
				<xsl:value-of select='Документ/@Дата'/>
			</font>
			<br/>

			<script type='text/javascript'>
				Model = document.getElementById("Project").getAttribute("hrefID").replace(/\s+$/,"");
				PathReport = GetPathFile(document.location.href);
				PathReports = fso.GetParentFolderName(PathReport);
				PathModel = PathReport.substring(0, (PathReport.indexOf(Model)+Model.length));
				if (!fso.FolderExists(PathModel+"/"+XS_INF_MODEL)) fso.CreateFolder(PathModel+"/"+XS_INF_MODEL);
				if (!fso.FolderExists(PathModel+"/"+XS_INF_BOLTSNOTES)) fso.CreateFolder(PathModel+"/"+XS_INF_BOLTSNOTES);
				var FileOut = PathModel+"/"+XS_INF_BOLTSNOTES+"/Work.txt";
				
				var FileNameInfo = "Примечание";
				
				if (!fso.FileExists(FileOut)) {
					if (!EventError.hasOwnProperty("Не удалось прочитать файл \""+FileNameInfo+"\"")) EventError["Не удалось прочитать файл \""+FileNameInfo+"\""] = "Файл загружен из оболочки. Не забудьте СОХРАНИТЬ его после редактирования!";
					FileIn = BoltsNotesShop;
				} else {
					FileIn = FileOut;
				}
				var TextFile = GetTextFile(FileIn);
				
				this.document.write('<br/>');
				this.document.write('<textarea id="TextArea" cols="94" rows="'+(TextOutRows+2)+'" wrap="hard">'+TextFile+'</textarea>');
				this.document.write('<br/>');
				this.document.write('<input type="submit" name="save" value="Сохранить" title="Сохранить в Модель"/>');
				this.document.write('<input type="reset" name="del" value="Удалить" title="Удалить из Модели"/>');
				
				SaveFile(FileOut);
				DelFile(FileOut);
			
			</script>
			
			<br/>
			<br/>
			
			<font face='Times'>
				<b>
					ПРИОРИТЕТ: 
				</b>
					<xsl:value-of select='Приоритет/@Приоритет'/>
			</font>
			<br/>
			<table id='DataTable' cellspacing='1' STYLE='border-collapse: collapse; border: 1px solid black;' border='2'>
				<thead bgcolor='#99CCFF'>
					<td colspan='8' align='center'>
						<font face='Times'>
							<b>
								<xsl:value-of select='Документ/@Название'/>
							</b>
						</font>
					</td>
				</thead>
				<tr bgcolor='#99CCFF'>
					<td width='160' align='center'>
						<font face='Times' size='2'>
							<b>
								Обозначение
							</b>
						</font>
					</td>
					<td width='80' align='center'>
						<font face='Times' size='2'>
							<b>
								Толщина пакета, мм
							</b>
						</font>
					</td>
					<td width='80' align='center'>
						<font face='Times' size='2'>
							<b>
								Длина, мм
							</b>
						</font>
					</td>
					<td width='80' align='center'>
						<font face='Times' size='2'>
							<b>
								Кол-во, шт.
							</b>
						</font>
					</td>
					<td width='60' align='center'>
						<font face='Times' size='2'>
							<b>
								Вес, кг
							</b>
						</font>
					</td>
					<td width='100' align='center'>
						<font face='Times' size='2'>
							<b>
								Стандарт
							</b>
						</font>
					</td>
					<td width='80' align='center'>
						<font face='Times' size='2'>
							<b>
								Класс прочности
							</b>
						</font>
					</td>
					<td id='Примечание' width='100' align='center'>
						<font face='Times' size='2'>
							<b>
								Примечание
							</b>
						</font>
					</td>
				</tr>
				<xsl:for-each select='Приоритет'>
					<xsl:for-each select='Болт'>
						<tr>
							<td align='left'>
								<font face='Times' size='2' contenteditable='true' title='Доступно исправление текста'>
									<xsl:value-of select='@Болт'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='Мин/@ТолщПакета'/> - <xsl:value-of select='Макс/@ТолщПакета'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Длина'/>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Количество*1.0, "##0.")'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Вес*0.0011, "##0.0")'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Стандарт'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Прочность'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Примечание'/>
								</font>
							</td>
						</tr>
					</xsl:for-each>
					<xsl:for-each select='Гайка'>
						<tr>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Гайка'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='Мин/@ТолщПакета'/> - <xsl:value-of select='Макс/@ТолщПакета'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Длина'/>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Количество*1.0, "##0.")'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Вес*0.0011, "##0.0")'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Стандарт'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Прочность'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Примечание'/>
								</font>
							</td>
						</tr>
					</xsl:for-each>
					<xsl:for-each select='Шайба'>
						<tr>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Шайба'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='Мин/@ТолщПакета'/> - <xsl:value-of select='Макс/@ТолщПакета'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Длина'/>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Количество*1.0, "##0.")'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Вес*0.0011, "##0.0")'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Стандарт'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Прочность'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Примечание'/>
								</font>
							</td>
						</tr>
					</xsl:for-each>
					<xsl:for-each select='Саморез'>
						<tr>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Саморез'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='Мин/@ТолщПакета'/> - <xsl:value-of select='Макс/@ТолщПакета'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Длина'/>
								</font>
							</td>
							<td align='center'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Количество*1.0, "##0.")'/>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<xsl:value-of select='format-number(@Вес*0.0011, "##0.0")'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Стандарт'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Прочность'/>
								</font>
							</td>
							<td align='left'>
								<font face='Times' size='2'>
									<xsl:value-of select='@Примечание'/>
								</font>
							</td>
						</tr>
					</xsl:for-each>
				</xsl:for-each>
			</table>
			<script type='text/javascript'>
				<![CDATA[
					window.onerror = null;
					var StrDataTable = document.getElementById("DataTable").getElementsByTagName("tr");
					
					inidx(StrDataTable[1].getElementsByTagName("td"), "id");
					
					for (var a = 2; a < StrDataTable.length; a++)
					{
						var NoteId = outidx('Примечание');
						var Note = StrDataTable[a].getElementsByTagName("td")[NoteId].innerText;
						if (!Note.indexOf("Ошибка длины !") || !Note.indexOf("> 3 шайб !!!")) StrDataTable[a].bgColor = "fdbcb4";
					}
					GetEventError(EventError,0);
				]]>
			</script>
		</body>
	</xsl:template>
</xsl:stylesheet>
