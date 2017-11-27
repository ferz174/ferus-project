function TransferData(FileName,ObjIn,ObjOut) {
	alert("Выбранно ф");
	
					
					    //var file = document.getElementById("Позиция_PDF").files;
						
						//alert("Выбранно файлов: "+file.length +"\n"+ file[0].name+ " --- "+ file[0].type +" ---- "+ file[0].size);
						//return;
					
						if (!GetLinkAlert()) return;
						
						UserName = ObjIn[ObjIn.info];
						
						for (var i in ObjOut){
							ObjOut[i] = GetObjXML(ObjOut[i]);
						}
						
						//netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect UniversalBrowserAccess");
						
						xhr.open("POST", PathProcess+"/"+"TransferData?id="+Project+"&structure="+encodeURI(JSON.stringify(ObjIn)), false);
						xhr.setRequestHeader("Content-Type", "application/json");
						xhr.setRequestHeader("File-name", FileName+".json");
						xhr.send(JSON.stringify(ObjOut));
					}