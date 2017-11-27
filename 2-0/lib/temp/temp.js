function infoModel()
{	

}

function showErrorFile(Project){
	var fso, tf;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    tf = fso.OpenTextFile("C:\\\\TeklaStructuresModels\\error_catalogs.log", 1); 
	
	this.document.writeln("ОШИБКИ ПО МОДЕЛИ " + Project +"  (<a href=\"C:\\TeklaStructuresModels\\TeklaStructuresModelsShell.html\">НАЗАД К МОДЕЛЯМ</a>)<br/>");
	this.document.writeln("=============================================================<br/>");
    while (!tf.AtEndOfStream)
    {
		this.document.writeln(tf.ReadLine());
        this.document.write("<br />");         
    }
    tf.Close();
	this.document.writeln("=============================================================<br/>");
	this.document.writeln("<a href=\"C:\\TeklaStructuresModels\\TeklaStructuresModelsShell.html\">НАЗАД К МОДЕЛЯМ</a>");		
}

function createErrorFile(Project){
	var fso, tf;
	var PathModel=PathModels+"\\"+Project+"\\";
    fso = new ActiveXObject("Scripting.FileSystemObject");
    tf = fso.CreateTextFile(PathModel + "error_catalogs.log", true); 
	
	if(str_error == "")
	{
		if(error_data.length > 0)
		{
            tf.WriteLine("******************** отсутствуют каталоги ***********************") ;
            for(i = 0; i < error_data.length; i++){
	    	    tf.WriteLine(PathModel + error_data[i]) ;
	        }  
        }
		
		if(twoArryDataMark.length > 0)
		{
    		tf.WriteLine("******************** отсутствуют марки ***********************") ;
        	for(i = 0; i < twoArryDataMark.length; i++){
	    		tf.WriteLine(twoArryDataMark[i][1]) ;
	    	} 
		}
		
		if(twoArryDataMark.length > 0)
		{
            tf.WriteLine("******************** отсутствуют позиции ***********************") ;
    	    for(i = 0; i < twoArryData.length; i++){
    	    	if(twoArryData[i][10] == "false")
                {
	        		tf.WriteLine(twoArryData[i][11]) ;
	            }
    	    	if(twoArryData[i][13] == "false")
                {
    	    		tf.WriteLine(twoArryData[i][14]) ;
    	        }
    	    	if(twoArryData[i][16] == "false")
                {
	    	    	tf.WriteLine(twoArryData[i][17]) ;
	            }		
    	    }    
		}
    }
	else
	{
		tf.WriteLine(str_error);
	}
    tf.Close();
}

function indexOfArry(array, value) {
    for(var i=0, l = array.length; i < l; i++) {
      if (array[i] === value) 
        return i;
    }
    return -1;
}