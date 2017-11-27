var str_error = "";

function insExistenceFile(FileStructure)
{
	var existPDF = "true";
	var existDXF = "true";
	var existNC  = "true";	
    var existQuest = "true";	

	i_file = 0;
	//for(i_m = 0; i_m < FileStructure.length; i_m++)
	//{		
		if(!fso.FileExists(FileStructure)) {str_error = "ФАЙЛ С ПУТЯМИ ОТСУТСТВУЕТ: "+ FileStructure;
    	} else {
			domxml.async = false;
    	    domxml.load(FileStructure);
        	var DataTable = domxml.documentElement;
	    	
        	if(DataTable == null) {str_error = "Структура XML не определена"; i_file += 1;
			} else {  
			indexArry = 0;
			indexArryMark = 0;
			
                 for (a = 0; a < DataTable.getElementsByTagName("Марка").length; a++)
                 {	
			        var xDocRoot = DataTable.getElementsByTagName("Марка")[a];
					var xDocDraw = xDocRoot.getElementsByTagName("Чертеж")[0];
					
					PathPDF = GetPathFile(PathReports+"/"+xDocDraw.getAttribute("pdf"));
					
    	            if(!fso.FileExists(PathPDF)) 
    	            {
						var index_twoArry = findidx(twoArryDataMark, PathPDF, 1);
							
			    	    if(index_twoArry == -1 || twoArryDataMark[index_twoArry][3] != xDocRoot.getAttribute("Номер") )
			    		{							
					        twoArryDataMark[indexArryMark] = [];
							twoArryDataMark[indexArryMark][0] = "Марка";
			                twoArryDataMark[indexArryMark][1] = PathPDF;							
			                twoArryDataMark[indexArryMark][2] = xDocDraw.getAttribute("pdf");
							twoArryDataMark[indexArryMark][3] = xDocRoot.getAttribute("Номер");
   					        twoArryDataMark[indexArryMark][4] = xDocRoot.getAttribute("Название");
							twoArryDataMark[indexArryMark][5] = xDocDraw.getAttribute("Шифр");
							twoArryDataMark[indexArryMark][6] = xDocRoot.getAttribute("Количество");
   					        twoArryDataMark[indexArryMark][7] = xDocRoot.getAttribute("Вес");
							twoArryDataMark[indexArryMark][8] = xDocRoot.getAttribute("Длина");
							twoArryDataMark[indexArryMark][9] = xDocRoot.getAttribute("Ширина");
   					        twoArryDataMark[indexArryMark][10] = xDocRoot.getAttribute("Высота");
							twoArryDataMark[indexArryMark][11] = xDocRoot.getAttribute("Примечание");
														
							indexArryMark += 1;							 					
			    		}
    	            }				
        	            for (b = 0; b < xDocRoot.getElementsByTagName("Позиция").length; b++)
                        { 
					      
			            existPDF = "true";
					    existDXF = "true";
					    existNC  = "true";					   
					   
	                    //Обработка файлов формата pdf
	                    var tagDoc = xDocRoot.getElementsByTagName("Позиция")[b];  
                       	
						PathPDF = GetPathFile(PathReports+"/"+tagDoc.getAttribute("pdf"));
    	                if(!fso.FileExists(PathPDF) && tagDoc.getAttribute("Примечание").indexOf("б/ч")) 
    	                {
			    		    if(findidx(twoArryData, PathPDF, 11) == -1) existPDF = "false"; 
    	                }
						 	
		    		    //Обработка файлов формата DXF    	      
						PathDXF = GetPathFile(PathReports+"/"+tagDoc.getAttribute("dxf"));
            	        if(!fso.FileExists(PathDXF) && tagDoc.getElementsByTagName("Профиль")[0].getAttribute("Номер").indexOf("Лист")!=-1)
            	        {
		    			    if(findidx(twoArryData, PathDXF, 14) == -1) existDXF = "false";
            	        }
		    		    //Обработка файлов формата NC 
            	        PathNC = GetPathFile(PathReports+"/"+tagDoc.getAttribute("nc"));
            	        if(!fso.FileExists(PathNC))
            	        {
		    			    if(findidx(twoArryData, PathNC, 17) == -1) existNC  = "false";
            	        }
						if((tagDoc.getAttribute("Номер")).indexOf("?") != -1 && existPDF  == "true" && existDXF  == "true" && existNC  == "true")
            	        {
		    			    existQuest  = "false";
            	        }
						
						if(existPDF == "false" || existDXF == "false" || existNC  == "false" ||  existQuest  == "false")
            	        {
						    twoArryData[indexArry] = [];
							twoArryData[indexArry][0] = "Позиция";
							twoArryData[indexArry][1] = tagDoc.getAttribute("Номер");
							twoArryData[indexArry][2] = tagDoc.getAttribute("Название");
							twoArryData[indexArry][3] = tagDoc.getElementsByTagName("Профиль")[0].getAttribute("Номер");
							twoArryData[indexArry][4] = tagDoc.getElementsByTagName("Профиль")[0].getAttribute("Материал");
				 			twoArryData[indexArry][5] = tagDoc.getAttribute("Количество");
							twoArryData[indexArry][6] = tagDoc.getAttribute("Длина");
							twoArryData[indexArry][7] = tagDoc.getAttribute("Ширина");
							twoArryData[indexArry][8] = tagDoc.getAttribute("Вес");
							twoArryData[indexArry][9] = tagDoc.getAttribute("Примечание");
							
							twoArryData[indexArry][10] = existPDF;
							twoArryData[indexArry][11] = PathPDF;
							twoArryData[indexArry][12] = tagDoc.getAttribute("pdf");							
							
							twoArryData[indexArry][13] = existDXF;
							twoArryData[indexArry][14] = PathDXF;
							twoArryData[indexArry][15] = tagDoc.getAttribute("dxf");
							
							twoArryData[indexArry][16] = existNC;
							twoArryData[indexArry][17] = PathNC;
							twoArryData[indexArry][18] = tagDoc.getAttribute("nc");
							
							indexArry += 1;
					    }
	                  }					  
                 }					  
    	    }
		}
	//}
}
 
function processMain(Model)
{   
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
    xmlDoc.async = false;  
	
	if(idVersionXMLMain(Model) == 0)
	{
	    CreateRootXMLMain(Model);	
	}
	else
	{
		updateVersionXMLMain(Model);
	}
	indexRXMLMain =  idVersionXMLMain(Model);

    GoCreateStructure();
	
	analyzerCopyFile(Model);
	//analyzerMoveFile(Model);
		
	alert("Файлы успешно экспортированы");
}

function analyzerCopyFile(Model) //Функция копирования файлов с директории  указаные PathStructure
{
	var PathStructure = GetPathStructure(Model);
		
	//Обработываем главные файлы проекты
	var str_file = PathModel + "\\Reports\\KMD.xml";	
    if(!fso.FileExists(str_file))
    {}
	else
	{			
    	xmlDoc.load(str_file);
		var xDoc = xmlDoc.documentElement;
	    
		indexNewArry = 0;
		for (i_root=0; i_root < xDoc.getElementsByTagName("Документы").length; i_root++)
        {
			var xDocRoot = xDoc.getElementsByTagName("Документы")[i_root];
			
            var PathXML = GetPathFile(PathReports+"/"+tagDoc.getAttribute("xml"));
			var pathTaklaEML = PathModel + strDocEML;
			if (fso.FileExists(PathXML)) 
			{	
	
				var pathTaklaOldEML = PathStructure[1] + strDocEML;
			 	fso.CopyFile (PathXML,  pathTaklaOldEML);
				var pathTaklaOldEML1 = PathStructure[2] + strDocEML;
			 	fso.CopyFile (PathXML,  pathTaklaOldEML1);
			}
			
			var PathPDF = GetPathFile(PathReports+"/"+tagDoc.getAttribute("pdf"));
			if (fso.FileExists(PathPDF)) 
			{				 
				var pathTaklaOldPDF = PathStructure[1] + strDocPDF;
			 	fso.CopyFile (PathPDF,  pathTaklaOldPDF);
				var pathTaklaOldPDF1 = PathStructure[2] + strDocPDF;
			 	fso.CopyFile (PathPDF,  pathTaklaOldPDF1);
			}
        }
	}	
	
	//Обработываем основные файлы
	str_file = PathModel+"\\Reports\\KMD-1-0.xml";		
    if(!fso.FileExists(str_file))
    {}
	else
	{	
    	xmlDoc.load(str_file);
		var xDoc = xmlDoc.documentElement;
	    
		indexNewArry = 0;
		for (i_root=0; i_root < xDoc.getElementsByTagName("Марка").length; i_root++)
        {
			var xDocRoot = xDoc.getElementsByTagName("Марка")[i_root]; 
			var xDocDraw = xDocRoot.getElementsByTagName("Чертеж")[0];
			
			strRootPdf = xDocDraw.getAttribute("pdf").replace("..","");
			var pathRootPDF = PathModel + strRootPdf;			
			if (fso.FileExists(pathRootPDF)) 
			{
				    var pathRootOldPDF = PathStructure[1] + strRootPdf;	
			 	    fso.CopyFile (pathRootPDF,  pathRootOldPDF);
					var pathRootOldPDF1 = PathStructure[2] + strRootPdf;	
			 	    fso.CopyFile (pathRootPDF,  pathRootOldPDF1);
			}
			for (i_mark=0; i_mark < xDocRoot.getElementsByTagName("Позиция").length; i_mark++)
            {
                var xDocMark = xDocRoot.getElementsByTagName("Позиция")[i_mark];
				
			    PathPDF = GetPathFile(PathReports+"/"+tagDoc.getAttribute("pdf"));
			    var pathTaklaPDF = PathModel + strMarkPdf;
			    if (fso.FileExists(PathPDF)) 
			    {				 
				    var pathTaklaOldPDF = PathStructure[1] + strMarkPdf;
			 	    fso.CopyFile (PathPDF,  pathTaklaOldPDF);
					var pathTaklaOldPDF1 = PathStructure[2] + strMarkPdf;
			 	    fso.CopyFile (PathPDF,  pathTaklaOldPDF1);
			    }
			   
			    var xDocProf = xDocRoot.getElementsByTagName("Позиция")[i_mark]; 
			    strProfDXF = xDocProf.getAttribute("dxf").replace("..","");			   
			    var pathTaklaDXF = PathModel + strProfDXF;               			
			    if (fso.FileExists(pathTaklaDXF)) 
			    {					 
					var pathTaklaOldDXF = PathStructure[1] + strProfDXF;
					fso.CopyFile (pathTaklaDXF,  pathTaklaOldDXF);
					var pathTaklaOldDXF1 = PathStructure[2] + strProfDXF;
					fso.CopyFile (pathTaklaDXF,  pathTaklaOldDXF1);
				}
			   
			    var xDocProf = xDocRoot.getElementsByTagName("Позиция")[i_mark]; 
			    strProfNC = xDocProf.getAttribute("nc").replace("..","");			   
			    var pathTaklaNC = PathModel + strProfNC;		
			    if (fso.FileExists(pathTaklaNC)) 
			    {
				    var pathTaklaOldNC = PathStructure[1] + strProfNC;
					fso.CopyFile (pathTaklaNC,  pathTaklaOldNC);
					var pathTaklaOldNC1 = PathStructure[2] + strProfNC;
					fso.CopyFile (pathTaklaNC,  pathTaklaOldNC1);
				}
	     	}			
        }	
	}
}

function analyzerMoveFile(Model) //Функция перемещения файлов с директории  указаные PathStructure
{
	var PathStructure = GetPathStructure(Model);
	var PathModel = PathModels+"\\"+Model;	
		
	//Обработываем основные файлы
	str_file = PathModel+"\\Reports\\KMD-1-0.xml";		
    if(!fso.FileExists(str_file))
    {}
	else
	{	
    	xmlDoc.load(str_file);
		var xDoc = xmlDoc.documentElement;
	    
		indexNewArry = 0;
		for (i_root=0; i_root < xDoc.getElementsByTagName("Марка").length; i_root++)
        {
			var xDocRoot = xDoc.getElementsByTagName("Марка")[i_root]; 
			var xDocDraw = xDocRoot.getElementsByTagName("Чертеж")[0];
			
			strRootPdf = xDocDraw.getAttribute("pdf").replace("..","");
			var pathRootPDF = PathModel + strRootPdf;			
			if (fso.FileExists(pathRootPDF)) 
			{
				    var pathRootOldPDF = PathStructure[1] + strRootPdf;	
			 	    fso.CopyFile (pathRootPDF,  pathRootOldPDF);
					var pathRootOldPDF1 = PathStructure[2] + strRootPdf;	
			 	    fso.CopyFile (pathRootPDF,  pathRootOldPDF1);
					//fso.DeleteFile(pathRootPDF, true);
			}
					
			for (i_mark=0; i_mark < xDocRoot.getElementsByTagName("Позиция").length; i_mark++)
            {
                var xDocMark = xDocRoot.getElementsByTagName("Позиция")[i_mark]; 
			    strMarkPdf = xDocMark.getAttribute("pdf").replace("..","");			   
			    var pathTaklaPDF = PathModel + strMarkPdf;
			    if (fso.FileExists(pathTaklaPDF)) 
			    {				 
				    var pathTaklaOldPDF = PathStructure[1] + strMarkPdf;
			 	    fso.CopyFile (pathTaklaPDF,  pathTaklaOldPDF);
					var pathTaklaOldPDF1 = PathStructure[2] + strMarkPdf;
			 	    fso.CopyFile (pathTaklaPDF,  pathTaklaOldPDF1);		
                    //fso.DeleteFile(pathTaklaPDF, true);					
			    }
			   
			    var xDocProf = xDocRoot.getElementsByTagName("Позиция")[i_mark]; 
			    strProfDXF = xDocProf.getAttribute("dxf").replace("..","");			   
			    var pathTaklaDXF = PathModel + strProfDXF;               			
			    if (fso.FileExists(pathTaklaDXF)) 
			    {					 
					var pathTaklaOldDXF = PathStructure[1] + strProfDXF;
					fso.CopyFile (pathTaklaDXF,  pathTaklaOldDXF);
					var pathTaklaOldDXF1 = PathStructure[2] + strProfDXF;
					fso.CopyFile (pathTaklaDXF,  pathTaklaOldDXF1);	
                    //fso.DeleteFile(pathTaklaDXF, true);						
				}
			   
			    var xDocProf = xDocRoot.getElementsByTagName("Позиция")[i_mark]; 
			    strProfNC = xDocProf.getAttribute("nc").replace("..","");			   
			    var pathTaklaNC = PathModel + strProfNC;		
			    if (fso.FileExists(pathTaklaNC)) 
			    {
				    var pathTaklaOldNC = PathStructure[1] + strProfNC;
					fso.CopyFile (pathTaklaNC,  pathTaklaOldNC);
					var pathTaklaOldNC1 = PathStructure[2] + strProfNC;
					fso.CopyFile (pathTaklaNC,  pathTaklaOldNC1);
					//fso.DeleteFile(pathTaklaNC, true);		
				}
	     	}			
        }	
	}
	
	//Обработываем главные файлы проекты
	var str_file = PathModel + "\\Reports\\KMD.xml";	
    if(!fso.FileExists(str_file))
    {}
	else
	{			
        //Создаем каталоги с новой версией
		var dirArry1 = PathStructure[1]+ '\\Reports\\';//+ (indexRXMLMain);
		
		if (fso.FolderExists(dirArry1) == false) 
		{			
		//	fso.CreateFolder(dirArry1);
		}
		var dirArry2 = PathStructure[2]+ '\\Reports\\';//+ (indexRXMLMain);
		if (fso.FolderExists(dirArry2) == false) 
		{
	    //  fso.CreateFolder(dirArry2);
		}
		    	
		
		xmlDoc.load(str_file);
		var xDoc = xmlDoc.documentElement;	    		
		indexNewArry = 0;
		for (i_root=0; i_root < xDoc.getElementsByTagName("Документы").length; i_root++)
        {
			var xDocRoot = xDoc.getElementsByTagName("Документы")[i_root];
            var strDocEML = xDocRoot.getAttribute("xml").replace("..","");			
			var pathTaklaEML = PathModel + strDocEML;
			if (fso.FileExists(pathTaklaEML)) 
			{	
				//var pathTaklaOldEML  = PathStructure[1] + strDocEML;
				//var pathTaklaOldEML1 = PathStructure[2] + strDocEML;
				
		       //Определяем вес обоих папок
			    var thefile = fso.getFile(pathTaklaEML);
                var size = thefile.size;

				fso.CopyFile (pathTaklaEML,  dirArry1 + /*"\\" +*/ fso.GetFileName(pathTaklaEML));				  
				fso.CopyFile (pathTaklaEML,  dirArry2 + /*"\\" +*/ fso.GetFileName(pathTaklaEML));				  
			}
			
            var strDocPDF = xDocRoot.getAttribute("pdf").replace("..","");
			var pathTaklaPDF = PathModel + strDocPDF;
			if (fso.FileExists(pathTaklaPDF)) 
			{				 
				var pathTaklaOldPDF = PathStructure[1] + strDocPDF;
			 	fso.CopyFile (pathTaklaPDF,  pathTaklaOldPDF);
				var pathTaklaOldPDF1 = PathStructure[2] + strDocPDF;
			 	fso.CopyFile (pathTaklaPDF,  pathTaklaOldPDF1);
			   	//fso.DeleteFile(pathTaklaPDF, true);
			}
        }
	}	
}

function CreateRootXMLMain(Model)
{
	var PathModel = PathModels+"\\"+Model;		
    fso = new ActiveXObject("Scripting.FileSystemObject");  
    if (!fso.FileExists(PathModel+"\\versionXMLFile.xml")) 
	{	
        var tf = fso.CreateTextFile(PathModel+"\\versionXMLFile.xml", true);
        tf.WriteLine("<?xml version=\"1.0\" encoding=\"utf-8\"?>") ;
	    tf.WriteLine("<Заказ Номер=\""+Model+"\">") ;
  	    tf.WriteLine("   <Очередь Номер=\"1\" />") ;
	    tf.WriteLine("</Заказ>") ;    
        tf.Close();
	}
}
	
function idVersionXMLMain(Model)
{	
    var PathModel = PathModels+"\\"+Model;
	fso = new ActiveXObject("Scripting.FileSystemObject");  
    
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
    xmlDoc.async = false;  
	data_val = 0;
	if(fso.FileExists(PathModel+"\\versionXMLFile.xml"))
	{			
    	xmlDoc.load(PathModel+"\\versionXMLFile.xml");	
        xmlDoc = xmlDoc.documentElement;		
		x = xmlDoc.getElementsByTagName("Очередь")[0];
		data_val = parseInt(x.getAttribute("Номер"));
		return data_val
	}
    return data_val
}

function updateVersionXMLMain(Model)
{	
    var PathModel = PathModels+"\\"+Model;
	fso = new ActiveXObject("Scripting.FileSystemObject");  
    
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
    xmlDoc.async = false;  
	if(fso.FileExists(PathModel+"\\versionXMLFile.xml"))
	{			
    	xmlDoc.load(PathModel+"\\versionXMLFile.xml");	
        xmlDoc = xmlDoc.documentElement;		
		x = xmlDoc.getElementsByTagName("Очередь")[0];
		data_val = parseInt(x.getAttribute("Номер")) + 1;
        y = x.getAttributeNode("Номер");
        y.nodeValue = data_val;
		fso = new ActiveXObject("Scripting.FileSystemObject");   
        tf = fso.CreateTextFile(PathModel+"\\versionXMLFile.xml", true);
		tf.WriteLine("<?xml version=\"1.0\" encoding=\"utf-8\"?>"); 		
        tf.WriteLine(xmlDoc.xml);    
        tf.Close();
		return data_val
	}	
}


