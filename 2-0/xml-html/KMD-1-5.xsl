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
			<br/>
			<font face='Times'>
				<b>
					ПРИОРИТЕТ: 
				</b>
					<xsl:value-of select='Приоритет/@Приоритет'/>
			</font>
			<br/>
			<table id='dataTable' cellspacing='1' STYLE='border-collapse: collapse; border: 1px solid black;' border='2'>
				<tr bgcolor='#99CCFF'>
					<td colspan='8' align='center'>
						<font face='Times'>
							<b>
								<xsl:value-of select='Документ/@Название'/>
							</b>
						</font>
					</td>
				</tr>
				<tr bgcolor='#99CCFF'>
					<td width='170' align='center'>
						<font face='Times' size='2'>
							<b>
								Профиль
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
					<td width='120' align='center'>
						<font face='Times' size='2'>
							<b>
								Материал
							</b>
						</font>
					</td>
					<td width='80' align='center'>
						<font face='Times' size='2'>
							<b>
								Длина, п.м.
							</b>
						</font>
					</td>
					<td width='70' align='center' bgcolor='#d1e3f0'>
						<font face='Times' size='2'>
							<b>
								Кол. ед.<br />позиций*
							</b>
						</font>
					</td>
					<td width='75' align='center' bgcolor='#d1e3f0'>
						<font face='Times' size='2'>
							<b>
								Кол. ед.<br />заготовки*
							</b>
						</font>
					</td>
					<td width='75' align='center'>
						<font face='Times' size='2'>
							<b>
								Вес, кг
							</b>
						</font>
					</td>
					<td id='Примечание' width='120' align='center'>
						<font face='Times' size='2'>
							<b>
								Примечание
							</b>
						</font>
					</td>
				</tr>
				<xsl:for-each select='Приоритет'>
					<xsl:for-each select='Прокат'>
						<xsl:sort order='ascending' select='@Прокат'/>
						<tr bgcolor='#d1e3f0'>
							<td align='left' colspan='6'>
								<font face='Times' size='2'>
									<b>
										<xsl:value-of select='@Прокат'/>
									</b>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<b>
										<xsl:value-of select='Итог/@Вес'/>
									</b>
								</font>
							</td>
							<td></td>
						</tr>
						<xsl:for-each select='Профиль'>
							<tr id='DataProfile'>
								<td align='left'>
									<font face='Times' size='2'>
										<xsl:value-of select='@Профиль'/>
									</font>
								</td>
								<td align='left'>
									<font face='Times' size='2'>
										<xsl:value-of select='Стандарт/@Стандарт'/>
									</font>
								</td>	
								<td align='left'>
									<font face='Times' size='2'>
										<xsl:value-of select='@Материал'/>
									</font>
								</td>
								<td align='right'>
									<font face='Times' size='2'>
										<xsl:value-of select='@Длина'/>
									</font>
								</td>
								<td align='center'>
									<font face='Times' size='2'>
										<xsl:value-of select='@Количество'/>
									</font>
								</td>
								<td align='right'>
									<font face='Times' size='2'>
										<xsl:value-of select='ceiling(@Характеристика div Заготовка/@Характеристика)'/> (<xsl:value-of select='format-number(@Характеристика div Заготовка/@Характеристика, "##0.00")'/>)
									</font>
								</td>
								<td align='right'>
									<font face='Times' size='2'>
										<xsl:value-of select='@Вес'/>
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
					<xsl:for-each select='ОбщийИтог'>
						<tr bgcolor='#979797'>
							<td colspan='6' align='left'>
								<font face='Times' size='2'>
									<b>
										ИТОГО, кг:
									</b>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<b>
										<xsl:value-of select='@Вес'/>
									</b>
								</font>
							</td>
							<td></td>
						</tr>
						<tr bgcolor='#979797'>
							<td colspan='7' align='left'>
								<font face='Times' size='2'>
									<b>
										ПЛОЩАДЬ ПОКРАСКИ, м
										<sup>
											2
										</sup>:
									</b>
								</font>
							</td>
							<td align='right'>
								<font face='Times' size='2'>
									<b>
										<xsl:value-of select='@Площадь'/>
									</b>
								</font>
							</td>
						</tr>
					</xsl:for-each>
				</xsl:for-each>
			</table>
			<br />* - справочная информация
			<br />Количество единиц заготовки (доля заполнения позициями последней заготовки) при:
			<br />длина стержня сорта заготовки - <xsl:value-of select='Приоритет/Прокат/Профиль/Заготовка/@ДлинаС'/> мм,
			<br />характиристика листа - <xsl:value-of select='Приоритет/Прокат/Профиль/Заготовка/@ДлинаЛ'/>x <xsl:value-of select='Приоритет/Прокат/Профиль/Заготовка/@ШиринаЛ'/> мм,
			<br />процент отхода сорта - <xsl:value-of select='Приоритет/Прокат/Профиль/Заготовка/@ПроцСорт'/>%,
			<br />процент отхода листа - <xsl:value-of select='Приоритет/Прокат/Профиль/Заготовка/@ПроцЛист'/>%.
			<script type='text/javascript'>
				<![CDATA[
					window.onerror = null;

					var StrDataTable = document.getElementById("DataTable").getElementsByTagName("tr");
					
					inidx(StrDataTable[1].getElementsByTagName("td"), "id");
					
					for (var a = 2; a < StrDataTable.length; ++a)
					{
						if (StrDataTable[a].id == "DataProfile") {
							var NoteId = outidx('Примечание');
							var Note = StrDataTable[a].getElementsByTagName("td")[NoteId].innerText;
							if (!Note.indexOf("Ошибка профиля !") || !Note.indexOf("Ошибка материала !")) StrDataTable[a].bgColor = "fdbcb4";
						}
					}
				]]>
			</script>
		</body>
	</xsl:template>
</xsl:stylesheet>
