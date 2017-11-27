﻿/* Теги xml-файлов */
function GetArrTagXml()
{
	var ArrOut = [
		"Заказ",			//KMD, KMD-1-0, KMD-1-1, KMD-1-2
		"Документ",			//KMD, KMD-1-0, KMD-1-1, KMD-1-2
		"Документы",		//KMD
		"Приоритет",		//??? KMD-1-0, KMD-1-1, KMD-1-2
		"Чертеж",			//KMD-1-0, KMD-1-1, KMD-1-2
		"Марка",			//KMD-1-0, KMD-1-1???, KMD-1-2
		"Позиция",			//KMD-1-0
		"Профиль",			//KMD-1-0
		""];
	return ArrOut;
}

/* Атрибуты верхнего колонтитула */
function GetArrAttrHead()
{
	var ArrOut = [
		"Номер",
		"Модель",
		"Объект",
		"Ответственный",
		"ДокументНомер",
		"ДокументРаздел",
		"ДокументНазвание",
		"ДокументДата",
		""];
	return ArrOut;
}

/* Атрибуты проверки наличия */
function GetArrAttrFiles()
{
	var ArrOut = [
		"pdf",				//Чертеж, Позиция
		"xml",				//Марка
		"nc",				//Позиция
		"dxf",				//Позиция
/*		
		"csv",				//Чертеж
		"txt",				//Чертеж
*/		
		""];
	return ArrOut;
}

/* Атрибуты проверки количества */
function GetArrAttrCheckSum()
{
	var ArrOut = new Array(
		"Количество",		//Марка, Позиция
		"Макроколичество",	//Марка, Позиция
		"Вес",				//Чертеж???, Марка, Позиция???
		"");
	return ArrOut;
}

/* Атрибуты проверки hash-сумм файлов */
function GetArrAttrHash()
{
	var ArrOut = [
		"hashpdf",			//Чертеж, Позиция
		"hashdxf",			//Позиция
		"hashnc",			//Позиция
		"hashxml",			//Марка
/*
		"hashcsv",			//Чертеж
		"hashxt",			//Чертеж
*/
		""];
	return ArrOut;
}

/* Атрибуты cравнения данных */
function GetArrAttrCompare()
{
	var ArrOut = [
		"Номер",			//Чертеж, Марка, Позиция, Профиль
		"Длина",			//Марка, Позиция
		"Ширина",			//Марка, Позиция
		"Высота",			//Марка
		"Вес",				//Чертеж???, Марка, Позиция
		"Материал",			//Профиль
		"Примечание",		//Чертеж, Марки, Позиция

		"Чертежhashpdf",	//Чертеж
		"Позицияhashpdf",	//Позиция
		"Позицияhashdxf",	//Позиция
		"Позицияhashnc",	//Позиция
		"Маркаhashxml",		//Марка
/*
		"hashcsv",			//Чертеж
		"hashxt",			//Чертеж
*/
		""];
	return ArrOut;
}



/* Атрибуты анализа данных */



/* Атрибуты вывода и обработки ошибок */
function GetArrAttrOut()
{
	var ArrOut = [
		"Номер",			//Чертеж, Марка, Позиция, Профиль
		"Название",			//Чертеж???, Марка, Позиция
		"Длина",			//Марка, Позиция
		"Ширина",			//Марка, Позиция
		"Высота",			//Марка
		"Количество",		//Марка, Позиция
		"Вес",				//Чертеж???, Марка, Позиция
		"Примечание",		//Чертеж, Марка, Позиция

		"pdf",				//Чертеж, Позиция
		"xml",				//Марка
		"nc",				//Позиция
		"dxf",				//Позиция
/*
		"csv",				//Чертеж
		"txt",				//Чертеж
*/
		""];
	return ArrOut;
}

/* Заголовки таблицы */
function GetArrAttrHeadTable()
{
	var ArrOut = [
		"Номер",			//Марка, Позиция
		"Конструктив\n(Имя)",//Марка, Позиция
		"Профиль",			//Чертеж???, Позиция
		"Материал",			//Позиция
		"Длина,\nмм",		//Позиция
		"Ширина,\nмм",		//Позиция
		"Кол.",				//Марка, Позиция
		"Вес,\nкг",			//Марка, Позиция
		"Примечание",		//Чертеж, Марка, Позиция

		"PDF",				//Чертеж, Позиция
		"XML",				//Марка
		"DXF",				//Позиция
		"NC",				//Позиция
/*
		"csv",				//Чертеж
		"txt",				//Чертеж
*/
		""];
	return ArrOut;
}

function AddAttrArr(ArrFind, ArrIn, ArrOut)
{
	for (i = 0; i < ArrIn.attributes.length; i++)
	{
		if (findidx(ArrFind, ArrIn.attributes[i].baseName) >= 0)
		{
			ArrOut.push(ArrIn.attributes[i].nodeValue.replace(/^\s+/, "").replace(/\s+$/, ""));
		}
	}
	return ArrOut;
}