function GetObjects(FileIn, ApplyIn)
{
	if (typeof(ApplyIn)=="undefined") ApplyIn = false;
	
	function GetObjReport(FileIn)
	{
		var ObjIn = GetObject(FileIn);
		var ObjOut = new Object();
		var ObjStructure = new Object();
		for (var i in ObjIn)
		{
			if (i == "info") continue;
			if (ObjIn[i].info.hasOwnProperty("XML")) {
				ObjName = ObjIn[i].info[ObjIn[i].info.info];
				var PathXML = ObjIn[i].info.XML;
				if (ApplyIn) PathXML = GetFindFile(false, PathReports, PathXML, true);
				ObjOut[ObjName] = PathXML;
			} else if (ObjIn[i].info.hasOwnProperty("length")) {
				ObjStructure = ObjIn[i];
			}
		}
		ObjStructure = GetObjFill(ObjStructure);
		return {"ObjReport":ObjIn, "ObjReports":ObjOut, "ObjStructure":ObjStructure};
	}

	function GetObjFill(ObjIn)
	{
		var ObjOut = new Object();
		ObjOut["info"] = ObjIn.info;
		for (var i in ObjIn)
		{
			if (i == "info") continue;
			var i = Number(ObjIn.info.length)-Number(i);
			ObjOut[ObjIn[i].info.info] = ObjIn[i][ObjIn[i].info.info].info;
			for (var j in ObjOut[ObjIn[i].info.info])
			{
				if (j != "info") {
					if (ObjIn[i].info.hasOwnProperty(j)) {
						if (j == ObjIn[i].info.info) continue;
						var ObjOutParent = new Object();
						var ObjOutChild = new Object();
						ObjOutChild[ObjOut[ObjIn[i].info.info][j]] = ObjIn[i].info[j];
						ObjOutParent[ObjIn[i].info.info+ModID+j] = ObjOutChild;
						ObjOut[ObjIn[i].info.info][j] = ObjOutParent;
					}
				} else {
					ObjOut[ObjIn[i].info.info][ObjOut[ObjIn[i].info.info][j]] = i;
				}
			}
		}
		return ObjOut;
	}
	
	var ObjOut = GetObjReport(FileIn);
	var Structure = (typeof(JSON) != "undefined") ? JSON.stringify(ObjOut.ObjStructure) : false; 	
	return {"Structure":Structure, "ObjStructure":(typeof(JSON) != "undefined") ? JSON.parse(Structure) : false, "ObjReports":ObjOut.ObjReports, "ObjReport":ObjOut.ObjReport, "ObjFill":(typeof(JSON) != "undefined") ? JSON.parse(Structure) : false};
}

function GetObjReports(ObjReports, ObjFill, ApplyIn)
{	
	if (typeof(ApplyIn) == "undefined") ApplyIn = false;
	if (typeof(ObjFill) == "undefined") ObjFill = false;
			
	for (var i in ObjReports)
	{
		var GlobalActID = ActID;
		if (typeof(ObjReports[i])=="object") continue;
		ObjReports[i] = GetObject(ObjReports[i], ObjFill, ApplyIn);
		if (GlobalActID != ActID) return false;
	}
	
	return {"ObjReports":ObjReports, "ObjFill":ObjFill};
}

function GetObject(FileIn, ObjFill, ApplyIn)
{
	if (typeof(ApplyIn) == "undefined") ApplyIn = false;
	var SubStructure = false;
	try {
		domxml.load(FileIn);
		if (!domxml.load(FileIn)) return false;
		
		if (!domxml.documentElement) {
			var XMLIn = GetMSXML(FileIn);
			if (XMLIn) {
				XMLIn = XMLIn.root;
			} else {
				return false;
			}
		} else {
			var XMLIn = domxml.documentElement;
		}
	} catch (error) {
		var XMLIn = GetMSXML(FileIn);
		if (XMLIn) {
			XMLIn = XMLIn.root;
		} else {
			return error instanceof ReferenceError;
		}
	}
	
	if (typeof(ObjFill)=="undefined" || !ObjFill) ObjFill = false;
	
	function GetObj(ObjIn, ObjFill, SubStructure)
	{
		var ObjOut = new Object();
		var TagID = (typeof(ObjIn.nodeName) != "undefined") ? ObjIn.nodeName.replace(/^\s+/, "").replace(/\s+$/, "") : ObjIn.tagName.replace(/^\s+/, "").replace(/\s+$/, "");
		var AttrID = ObjIn.getAttribute(TagID);
		
		if (ApplyIn && !SubStructure && ObjIn.getAttribute("length")) {
			SubStructure = AttrID.replace(/^\s+/, "").replace(/\s+$/, "");
			AttrID = Repository.replace(/^\s+/, "").replace(/\s+$/, "");
		}
		
		var Child = (ObjIn.children) ? ObjIn.children : ObjIn.childNodes;
		if (Child && Child.length) {			
			ObjOut["info"] = GetObjAttr(TagID, ObjIn, ObjFill, SubStructure);	
			for (var i = 0; i < Child.length; i++) 
			{
				var TagID = (typeof(Child.item(i).tagName) != "undefined") ? Child.item(i).tagName.replace(/^\s+/, "").replace(/\s+$/, "") : (typeof(Child.item(i).nodeName) != "undefined") ? Child.item(i).nodeName : Child.item(i).tagName.replace(/^\s+/, "").replace(/\s+$/, "");
				
				AttrID = Child.item(i).getAttribute(TagID);
				
				if (AttrID) {
					AttrID = AttrID.replace(/^\s+/, "").replace(/\s+$/, "");
					if (ApplyIn) {
						if (Child.item(i).getAttribute("length")) AttrID = Repository.replace(/^\s+/, "").replace(/\s+$/, "");
						if (!ExportType) {
							if (AttrID.indexOf("По очередям (/1/):") + 1) AttrID = "По очередям: "+Repository;
						} else if (ExportType == 1) {
							if (AttrID.indexOf("По чертежам:") + 1) AttrID = "По чертежам: "+Repository;
						} else if (ExportType == 2) {
							if (AttrID.indexOf("По очередям:") + 1) AttrID = "По очередям: "+Repository;
						} else if (ExportType == 3) {
							if (AttrID.indexOf("По сквозной:") + 1) AttrID = "По сквозной: "+Repository;
						}
					}
					
					ObjOut[AttrID] = GetObj(Child.item(i), ObjFill, SubStructure);
				} else if (Child.item(i).attributes.length) {
					ObjOut[TagID] = GetObj(Child.item(i), ObjFill, SubStructure);
				} else {
					ObjOut[TagID] = GetObj(Child.item(i), ObjFill, SubStructure);
				}
			}
			return ObjOut;
		} else {
			if (AttrID) {
				ObjOut["info"] = GetObjAttr(TagID, ObjIn, ObjFill, SubStructure);
			} else if (ObjIn.attributes.length) {
				ObjOut["info"] = GetObjAttr(TagID, ObjIn, ObjFill, SubStructure);
			} else {
				ObjOut[TagID] = ObjIn.innerHTML;
			}
			return ObjOut;
		}
		return ObjOut;
	}

	function GetObjAttr(TagID, ObjIn, ObjFill, SubStructure)
	{
		var ObjOut = new Object();
		for (var i = 0; i < ObjIn.attributes.length; i++)
		{
			var AttrName = (typeof(ObjIn.attributes.item(i).name) != "undefined") ? ObjIn.attributes.item(i).name.replace(/^\s+/, "").replace(/\s+$/, "") : (typeof(ObjIn.attributes[i].baseName) != "undefined") ? ObjIn.attributes[i].baseName.replace(/^\s+/, "").replace(/\s+$/, "") : ObjIn.attributes[i].localName.replace(/^\s+/, "").replace(/\s+$/, "");
			var AttrValue = (typeof(ObjIn.attributes.item(i).value) != "undefined") ? ObjIn.attributes.item(i).value.replace(/^\s+/, "").replace(/\s+$/, "") : ObjIn.attributes[i].nodeValue.replace(/^\s+/, "").replace(/\s+$/, "");
			if (ObjFill) SetObjFill(ObjFill, TagID, AttrName, AttrValue, SubStructure);
			
			if (ApplyIn) {
				if (!ExportType) {
					if (AttrName == "Экспорт" && AttrValue == "0") AttrValue = "2";
					if (AttrValue.indexOf("По очередям (/1/):") + 1) AttrValue = "По очередям: "+Repository;
				} else if (ExportType == 1) {
					if (AttrValue.indexOf("По чертежам:") + 1) AttrValue = "По чертежам: "+Repository;
				} else if (ExportType == 2) {
					if (AttrValue.indexOf("По очередям:") + 1) AttrValue = "По очередям: "+Repository;
				} else if (ExportType == 3) {
					if (AttrValue.indexOf("По сквозной:") + 1) AttrValue = "По сквозной: "+Repository;
				}
				
				if (TagID == AttrName && ObjIn.getAttribute("length")) AttrValue = Repository.replace(/^\s+/, "").replace(/\s+$/, "");
				if (SubStructure && (AttrValue.indexOf("../") + 1)) {
					AttrValue = GetFindPath(false, AttrValue).FileIn.replace(Repository, "/");
				} else if (AttrValue.indexOf("../") + 1) {
					AttrValue = GetFindPath(false, AttrValue).FileIn;
				}
			}
			
			ObjOut[AttrName] = AttrValue;
		}
		if (!ObjOut.hasOwnProperty("info")) ObjOut["info"] = TagID;
		return ObjOut;
	}
	
	function SetObjFill(ObjFill, TagID, AttrName, AttrValue, SubStructure)
	{
		var AttrValueOut = AttrValue
		if (AttrName == "info") return;
		if (ObjFill.hasOwnProperty(TagID) && ObjFill[TagID].hasOwnProperty(AttrName)) {
			var NonAttr = true;
			var KeyStructure = TagID+ModID+AttrName;
			var ObjLinks = ObjFill[TagID][AttrName];
			var ObjLink = ObjLinks[KeyStructure];
			var ObjectID = ObjFill[TagID][ObjFill[TagID].info];
			
			if (ObjLinks.hasOwnProperty(KeyStructure)) {
				if (!ObjLink.hasOwnProperty("length")) {
					var ArrLength = new Array();
					var IdxLength = 0; 
					ArrLength[IdxLength] = 0;
					IdxLength += 1;
					
					for (var j in ObjLink)
					{
						ArrLength[IdxLength] = j;
						IdxLength += 1;
						ArrLength[IdxLength] = ObjLink[j];
						delete  ObjLink[j];
					}
					ObjLink["length"] = ArrLength;
				}
				
				if (typeof ObjLink.length == "object") {
					for (k = 1; k < ObjLink.length.length; k++)
					{
						if (ObjLink.length[k] == AttrValue) {
							ObjLink.length.splice(k, 1);
							NonAttr = false;
						}
					}
				}
			} else if (ObjFill[TagID].info == AttrName && !SubStructure) {
				if (typeof ObjectID != "object") {
					var ObjectLength = ObjectID;
					ObjectID = new Object();
					ObjectID.number = ObjectLength;
					ObjectID.length = 0;
				}
				
				if (ObjectID.hasOwnProperty(AttrValue)) {
					ObjectID[AttrValue] -= 1;
				} else {
					ObjectID.length += 1;
					ObjectID[AttrValue] = ObjectID.number;
					ObjFill[TagID][ObjFill[TagID].info] = ObjectID;
				}
			}
			
			if (ApplyIn && AttrValue.indexOf("../") + 1) AttrValueOut = GetFindPath(false, AttrValue).FileIn;
			
			// if (ExportType == 1 && !SubStructure && (Repository == "/"+XS_PERF+"/" || Repository == "/"+UserID+"/" || Repository == "/1/" || (Repository.indexOf(Project+"-KMD-") + 1))) {
				// if ((Repository.indexOf(Project+"-KMD-") + 1) && TagID == "Чертеж" && AttrName == "Номер") {
					// Repository = "/"+Project+"-KMD-"+AttrValue+"/";
				// } else {
					// GetPathExport(Reports+"/1/"+Report.File);
				// }
			// }
			
			if (NonAttr) {
				if (typeof ObjLinks != "object") ObjLinks = new Object();
				
				if (!ObjLinks[AttrValue]) {
					if (typeof ObjLinks[AttrValue] != "object") ObjLinks[AttrValue] = new Array();
					ObjLinks[AttrValue].push(AttrValueOut);					
					if (ObjLinks.hasOwnProperty(KeyStructure) && ObjLink.hasOwnProperty("length")) {
						if (typeof ObjLink.length == "object") {
							if (ObjLink.length.length == 1) {
								ObjLink.length = ObjLink.length[0];
								ObjLink.length += 1;
							} else {
								ObjLink.length[0] += 1;
							}
						} else {
							ObjLink.length += 1;
						}
					}
				}
			}
		}
	}
	return GetObj(XMLIn, ObjFill, SubStructure);
}

function SetObject(FileIn, ObjFill, ObjStructure, ApplyIn)
{
	if (typeof(ApplyIn)=="undefined") ApplyIn = false;
	var SubStructure = false;
	var arryChangeTags = [];
	
	try {
		domxml.load(FileIn);
		if (!domxml.load(FileIn)){
			return false;
		}		
	} catch (e) {
		if (msxml) {
			msxml.URL = FileIn;
			return SetObj(msxml.root, ObjFill, false, []).ObjOut;
		}
		return e instanceof ReferenceError;
	}
	
	function SetObj(ObjIn, ObjFill, SubStructure,  arryChTags)
	{
		var ObjOut = new Object();
		var ObjSubOut = new Object();
		var TagID = (typeof(ObjIn.nodeName) != "undefined") ? ObjIn.nodeName.replace(/^\s+/, "").replace(/\s+$/, "") : ObjIn.tagName.replace(/^\s+/, "").replace(/\s+$/, "");
		var AttrID = ObjIn.getAttribute(TagID);	
		
		if (ApplyIn && !SubStructure && ObjIn.getAttribute("length")) {
			SubStructure = true;
			AttrID = GetFindPath(false, AttrID).FileIn.replace(/\/\//g,"/").replace(/\.\./g,"");
		}
		
		arryChangeTags = arryChTags;	
		
		var Child = (ObjIn.children) ? ObjIn.children : ObjIn.childNodes;
		if (Child.length) {	
			var jObjOut = SetObjAttr(TagID, ObjIn, ObjFill, SubStructure);	
			ObjOut["info"] = jObjOut.ObjOut;
			ObjSubOut["info"] = jObjOut.ObjAddOut;
			arryChTags = arryChangeTags;
			
			for (var i = 0; i < Child.length; i++) 
			{	
		
				var TagID = (typeof(Child.item(i).tagName) != "undefined") ? Child.item(i).tagName.replace(/^\s+/, "").replace(/\s+$/, "") : (typeof(Child[i].nodeName) != "undefined") ? Child[i].nodeName : Child[i].tagName.replace(/^\s+/, "").replace(/\s+$/, "");
				
				//var AttrID = (typeof(GetAttribute()) === "function") ? Child.item(i).GetAttribute(TagID) : Child[i].getAttribute(TagID);
				AttrID = Child[i].getAttribute(TagID);
								
				if(ObjFill.hasOwnProperty(AttrID)) {
					arryObjFill = ObjFill[AttrID]; 
				} else {			
					arryObjFill = {"newobject" : true };					
				}
				var AttrOrTagID = ""; 
				if (AttrID) {
					AttrID = AttrID.replace(/^\s+/, "").replace(/\s+$/, "");
					if (ApplyIn && Child[i].getAttribute("length")) AttrID = GetFindPath(false, AttrID).FileIn.replace(/\/\//g,"/").replace(/\.\./g,"");				
					AttrOrTagID = AttrID;
				} else {
					AttrOrTagID = TagID;					
				}				
				jObjOut = SetObj( Child[i], arryObjFill, SubStructure, arryChTags.concat() );
				ObjSubOut[AttrOrTagID]= jObjOut.ObjSubOut;
				ObjOut[AttrOrTagID] = jObjOut.ObjOut;	
				
				if(arryObjFill.newobject == true && !ObjFill.hasOwnProperty("newobject")) ObjFill[AttrOrTagID] = ObjOut[AttrOrTagID];				
				
				if(arryChTags.length == 0 && arryChangeTags.length > 0) {										
					ObjFill[arryChangeTags.join("|")] = ObjSubOut[AttrOrTagID];
					if(ObjSubOut[AttrOrTagID].hasOwnProperty("info") && ObjSubOut[AttrOrTagID].info.hasOwnProperty("info")) {
						ObjSubOut[AttrOrTagID].info[ObjSubOut[AttrOrTagID].info.info] = arryChangeTags.join("|");
					}
				}				
			} 			
		} else {			
			if (AttrID || ObjIn.attributes.length) {
				var jObjOut = SetObjAttr(TagID, ObjIn, ObjFill, SubStructure);
				ObjOut["info"] = jObjOut.ObjOut;
				ObjSubOut["info"] = jObjOut.ObjAddOut;		
			} else {
				ObjOut[TagID] = ObjIn.innerHTML;
				ObjSubOut[TagID] = ObjIn.innerHTML;
			}			
		}		
		arryChTags = arryChangeTags;
		return { "ObjOut" : ObjOut, "ObjSubOut" : ObjSubOut };
	}

	function SetObjAttr(TagID, ObjIn, ObjFill, SubStructure)
	{		
		var ObjOut = new Object();
		var ObjAddOut = new Object();
		for (var i = 0; i < ObjIn.attributes.length; i++)
		{
			var AttrName = (typeof(ObjIn.attributes.item(i).name) != "undefined") ? ObjIn.attributes.item(i).name.replace(/^\s+/, "").replace(/\s+$/, "") : (typeof(ObjIn.attributes[i].baseName) != "undefined") ? ObjIn.attributes[i].baseName.replace(/^\s+/, "").replace(/\s+$/, "") : ObjIn.attributes[i].localName.replace(/^\s+/, "").replace(/\s+$/, "");
			var AttrValue = (typeof(ObjIn.attributes.item(i).value) != "undefined") ? ObjIn.attributes.item(i).value.replace(/^\s+/, "").replace(/\s+$/, "") : ObjIn.attributes[i].nodeValue.replace(/^\s+/, "").replace(/\s+$/, "");
			
			ObjOut[AttrName] = SetObjFill(ObjFill, TagID, AttrName, AttrValue, ObjAddOut);
		}
		if (!ObjOut.hasOwnProperty("info")) {
			ObjOut["info"] = TagID;
			ObjAddOut["info"] = TagID;
		}	
		
		return { "ObjOut" : ObjOut, "ObjAddOut" : ObjAddOut };
	}
	
	function SetObjFill(ObjFill, TagID, AttrName, AttrValue, ObjAddOut)
	{
		ObjAddOut[AttrName] = AttrValue;
		if (TagID!=AttrName && AttrName!="info" && ObjFill) {
			if (ObjStructure.hasOwnProperty(TagID) && ObjStructure[TagID].hasOwnProperty(AttrName)) {
				var NonAttr = true;
					var KeyStructure = TagID+ModID+AttrName;
					var ObjLinks = ObjStructure[TagID][AttrName];
					var ObjLink = ObjLinks[KeyStructure];
					
					if (ObjLinks.hasOwnProperty(KeyStructure)) {
						if (!ObjLink.hasOwnProperty("length")) {
							var ArrLength = new Array();
							var IdxLength = 0; 
							ArrLength[IdxLength] = 0;
							IdxLength += 1;
							
							for (var j in ObjLink)
							{
								ArrLength[IdxLength] = j;
								IdxLength += 1;
								ArrLength[IdxLength] = ObjLink[j];
								delete  ObjLink[j];
							}
							ObjLink["length"] = ArrLength;
						}
						
						if (typeof ObjLink.length == "object") {
							for (k = 1; k < ObjLink.length.length; k++)
							{
								if (ObjLink.length[k] == AttrValue) {
									ObjLink.length.splice(k, 1);
									NonAttr = false;
								}
							}
						}
					}					
					if (NonAttr) {
						if (typeof ObjLinks!="object") ObjLinks = new Object();
						if (!ObjLinks[AttrValue]) {
							ObjLinks[AttrValue] = new Array();
							if (ObjLinks.hasOwnProperty(KeyStructure) && ObjLink.hasOwnProperty("length")) {
								if (typeof ObjLink.length == "object") {
									if (ObjLink.length.length == 1) {
										ObjLink.length = ObjLink.length[0];
										ObjLink.length += 1;
									} else {
										ObjLink.length[0] += 1;
									}
								} else {
									ObjLink.length += 1;
								}
							}
						}
					}
					
				if (SubStructure && ApplyIn && TagID == AttrName && ObjIn.getAttribute("length")) AttrValue = GetFindPath(false, AttrValue).FileIn.replace(/\/\//g,"/").replace(/\.\./g,"");
				
				if (ApplyIn && AttrValue.indexOf("../") + 1) {
					if (!SubStructure) {
						AttrValue = GetFindPath(false, AttrValue).FileIn;
						ObjAddOut[AttrName] = AttrValue;
					} else {
						//console.log(AttrValue);
					}
				}				
			} else {
				if(ObjFill.hasOwnProperty("info") && ObjFill.info.hasOwnProperty(TagID)) {
					if(ObjFill.info.hasOwnProperty(AttrName) && ObjFill.info[AttrName] != AttrValue) {							
						var strTagNameNew = ObjFill.info[TagID];
						if(strTagNameNew.indexOf(ModID)== -1) {
							strTagNameNew = strTagNameNew + ModID + "1";
						} else {
							arryTagName = strTagNameNew.split(ModID);
							strTagNameNew = arryTagName[0] + ModID + (Number(arryTagName[1]) + 1); 
						}
						
						if(arryChangeTags[arryChangeTags.length - 1] != strTagNameNew) arryChangeTags.push(strTagNameNew);
																		
			    		var objdual = new Object();
			    		objdual[ObjFill.info[TagID]] = ObjFill.info[AttrName];
			    		objdual[arryChangeTags.join("|")] = AttrValue;						
						
						return objdual;			    		
			    	}
			    	//console.log(AttrName + "  ==>>  " + AttrValue);
			    }
			}
		}
		return AttrValue;
	}
	
	if (ObjFill) { 
		var rtf =  SetObj(domxml.documentElement, ObjFill, SubStructure, []).ObjOut;
		
		//console.log(rtf);
		//console.log(ObjFill);
		
		return rtf;
	} else {
		return SetObj(domxml.documentElement, false, SubStructure, []).ObjOut;
	}
	
}

function SetBuildData(PathOut, ObjIn)
{
	var ArrOut = new Array();
	var	ResourceTemplate = Resource+"/xml-html";
	var FileExt = "xml";
	var ExtTemplate = "xsl";
	for (var FileName in ObjIn)
	{
		var FileOut = PathOut+FileName+"."+FileExt;
		
		if (!ObjIn[FileName]) continue;
		var DocumentTemplate = FileName;
		if (FileName == "KMD") DocumentTemplate = FileName+"-1";
		if (!nnod) {
			var ObjOut = buildxml.begin()
			.dec({encoding: "utf-8"})
			.ins("xml-stylesheet", "type=\"text/"+ExtTemplate+"\" href=\""+ResourceTemplate+"/"+DocumentTemplate+"."+ExtTemplate+"\"");
			ObjOut.importDocument(SetXMLObj(ObjIn[FileName], false));
			fso.writeFile(FileOut, ObjOut.end({ pretty: true }));

			console.log(DateAndTime+" GetExportData ["+Project+"]: "+FileOut.replace(PathProject+"/", "../../"));
			ArrOut.push(FileOut);
			delete ObjOut;
		} else if (!nax) {
			var ObjOut = domxml;
			ObjOut.appendChild(SetXMLObj(ObjIn[FileName], false));
			
			SaveStreamFile(ObjOut.xml, FileOut, "<?xml version=\"1.0\" encoding=\"utf-8\"?><?xml-stylesheet type=\"text/"+ExtTemplate+"\" href=\""+ResourceTemplate+"/"+DocumentTemplate+"."+ExtTemplate+"\"?>");
			
			ArrOut.push(FileOut);
			
			while (ObjOut.firstChild) ObjOut.removeChild(ObjOut.firstChild);
		}
	}
	
	function SetXMLObj(ObjIn, ParentTagID)
	{
		if (!ObjIn.hasOwnProperty("info")) return;
			
		var OutInfo = false;
		if (ParentTagID && ParentTagID != ObjIn.info[ObjIn.info.info] && ObjIn.info[ObjIn.info.info]) {	
			var TagID = (!nnod) ? buildxml.begin().ele(ParentTagID) : domxml.createElement(ParentTagID);
			OutInfo = true;
		} else {
			var TagID = (!nnod) ? buildxml.begin().ele(ObjIn.info.info) : domxml.createElement(ObjIn.info.info);
		}
		
		for (var AttrName in ObjIn.info)
		{
			if (nnod) { 
				var att = domxml.createAttribute(AttrName);
				att.value = ObjIn.info[AttrName];
			}
			if (AttrName != "info") {
				(!nnod) ? TagID.att(AttrName, ObjIn.info[AttrName]) : TagID.setAttributeNode(att);
			} else if (OutInfo) {
				(!nnod) ? TagID.att(AttrName, ObjIn.info[AttrName]) : TagID.setAttributeNode(att);
			}
		}
		
		for (var AttrName in ObjIn)
		{	
			if ( AttrName != "info") (!nnod) ? TagID.importDocument(SetXMLObj(ObjIn[AttrName], AttrName)) : TagID.appendChild(SetXMLObj(ObjIn[AttrName], AttrName));
		}
		
		return TagID;
	}
	return ArrOut;
}

function TransferData(Structure, ObjStructure, ObjReports, ObjFill)
{
try {
	if (!confirm("Выполнить синхронизацию данных и файлов по заказу: "+Project+"?\nПосле синхронизации, данные будут доступны только Вам!!!\n")) {
		Refresh(0);
		return;
	}
	var TimeRefresh = 300000;
	
	NoteEventAlert("Событие: Синхронизация данных и файлов по заказу: "+Project, "Пожалуйста, дождитесь завершения передачи данных ...", false, TimeRefresh, "note", 0);
	
	if (!GetLinkAlert()) {
		NoteEventAlert("Событие: Синхронизация данных и файлов закончилась - неудачно !!!", "Перед повторным экспортом обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы всегда можете посмотреть наличие файлов в XML-исходниках", false, TimeRefresh, "error", 0);
		Refresh(TimeRefresh);
		return;
	}
	
	var Objects = GetObjReports(ObjReports, ObjFill, true);
	
	if (!Objects) {
		NoteEventAlert("Событие: Синхронизация данных и файлов закончилась - неудачно !!!", "Отправляемые данные не актуальны. Пожалуйста, пересоздайте отчеты и повторите попытку", false, TimeRefresh, "error", 0);
		Refresh(TimeRefresh);
		return;
	}
	
	if (!OutReply) {
		xhr.open("POST", PathProcess+"/"+"TransferData?project="+encodeURI(Project)+"&user="+encodeURI(UserID)+"&repository="+encodeURI(Repository)+"&structure="+encodeURI(Structure), false);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('file-name', encodeURI(Project+'.json'));
		xhr.send(JSON.stringify(Objects.ObjReports));
	}
	
	var ArrInput = document.getElementById("TransferFiles").getElementsByTagName('input');
	for (var i = 0; i < ArrInput.length; i++)
	{
		if (ArrInput[i].getAttribute("type") == "file") {
			var KeyStructure = ArrInput[i].id.split(ModID);
			var PathIn = ObjStructure[KeyStructure[0]][KeyStructure[1]][ArrInput[i].id][ArrInput[i].getAttribute("name")];
			var SubStructure = ObjStructure.info[ObjStructure.info.info];
			KeyStructure[1] = KeyStructure[1].replace("NC1","DSTV");
			var FilesInput = ArrInput[i].files;
			
			var ObjLinks = Objects.ObjFill[KeyStructure[0]][KeyStructure[1]];
			var ObjLink = ObjLinks[ArrInput[i].id.replace("NC1","DSTV")];
					
			var ArrProgress = {
				"NumberObjects":ObjLink.length,
				"NumberInput":FilesInput.length,
				"NumberProcessed":0,
				"NumberSynced":0}
			
			var PROGRESS_INPUT = document.createElement("progress");
			PROGRESS_INPUT.id = "progress"+ModID+ArrInput[i].id;
			PROGRESS_INPUT.setAttribute("value", ArrProgress.NumberSynced);
			PROGRESS_INPUT.setAttribute("max", ArrProgress.NumberInput);
			
			var NOTE_PROGRESS = document.createElement("label");
				
			if (ArrProgress.NumberInput && !document.getElementById("progress"+ModID+ArrInput[i].id)) {
				ArrInput[i].parentElement.appendChild(PROGRESS_INPUT);
				ArrInput[i].parentElement.appendChild(NOTE_PROGRESS);
			}
									
			for (var j = 0; j < FilesInput.length; j++)
			{
				ArrProgress.NumberProcessed += 1;
				var PathOut = false;
				var PathInKey = PathIn+SubStructure+FilesInput[j].name;
				if (KeyStructure[1] == "DG") PathInKey = PathIn+"/"+FilesInput[j].name;;
				if (ObjLinks.hasOwnProperty(PathInKey)) {
					PathOut = ObjLinks[PathInKey];
				} else {
					//Умный поиск файлов (по номеру и листу)
				}
				 
				if (PathOut) {
					xhr.open("POST", PathProcess+"/"+"TransferData?project="+encodeURI(Project)+"&user="+encodeURI(UserID)+"&repository="+encodeURI(Repository), false);
					xhr.setRequestHeader('Content-Type', 'multipart/form-data');
					xhr.setRequestHeader('file-name', encodeURI(PathOut));
					xhr.onreadystatechange = function() {
						if (xhr.status == 200 && xhr.responseText == "true") {
							delete ObjLinks[PathInKey];
							ObjLink.length -= 1;
							ArrProgress.NumberSynced += 1;
							PROGRESS_INPUT.setAttribute("value", ArrProgress.NumberSynced);
							console.log("файл отправлен : " + FilesInput[j].name);// xhr.responseText);
						}
					};
					xhr.send(FilesInput[j]);
				} else {
					ArrProgress.NumberInput -= 1;
					PROGRESS_INPUT.setAttribute("max", ArrProgress.NumberInput);
					console.log("файл не найден : " + PathIn + " | " + FilesInput[j].name+" | " + KeyStructure[0]+" | "+KeyStructure[1]);
				}
				NOTE_PROGRESS.innerHTML = "<img height='15' border='0' src='"+PathIMGMain+"/filesync.png' alt='Нет файла: "+PathIMGMain+"/filesync.png'/>"+ArrProgress.NumberSynced+" / "+ArrProgress.NumberObjects;
			}
			if ((ArrProgress.NumberObjects!=ArrProgress.NumberSynced && ArrProgress.NumberProcessed) && !EventError.hasOwnProperty(ArrInput[i].getAttribute("name")+". Нет "+KeyStructure[1]+"-файлов(а): "+(ArrProgress.NumberObjects-ArrProgress.NumberSynced)+" шт.")) EventError[ArrInput[i].getAttribute("name")+". Нет "+KeyStructure[1]+"-файлов(а): "+(ArrProgress.NumberObjects-ArrProgress.NumberSynced)+" шт."] = "Для более подробной информации обратитесь к XML-исходникам";
		}
	}
	var ErrorNumber = GetEventError(EventError, 0, TimeRefresh);
	
	
	if (!ErrorNumber) {
		NoteEventAlert("Событие: Синхронизация данных и файлов завершилась - успешно", "Перед повторной синхронизацией обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы можете посмотреть наличие файлов в XML-исходниках после успешной синхронизации", false, TimeRefresh, "note", 0);
		if (!OutReply) ExportData(ObjStructure, Objects.ObjReports, Objects.ObjFill, ErrorNumber, false);
	} else {
		NoteEventAlert("Событие: Синхронизация данных и файлов завершилась - с ошибками !", "Перед повторной синхронизацией обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы можете посмотреть наличие файлов в XML-исходниках", false, TimeRefresh, "warning", 0);
	}
	Refresh(TimeRefresh);
	
} catch (error) {
	NoteEventAlert("Событие: Синхронизация данных и файлов завершилась - неудачно !!! ("+error.message+")", "Перед повторной синхронизацией обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы можете посмотреть наличие файлов в XML-исходниках после успешной синхронизации", false, TimeRefresh, "error", 0);
}
}

function ExportData(ObjStructure, ObjReports, ObjFill, ErrorNumber, ApplyIn)
{
	if (typeof(ErrorNumber) == "undefined") ErrorNumber = 0;
	if (typeof(ApplyIn) == "undefined") ApplyIn = true;
	EventError = new Object();
	var TimeRefresh = 300000;
	
	if (!confirm("Выполнить экспорт данных и файлов по заказу: "+Project+"?\nПосле экспорта, данные будут доступны любому пользователю,\nкоторому Вы передадите ссылку")) {
		if (ApplyIn) Refresh(0);
		return;
	} else {
		NoteEventAlert("Событие: Экспорт данных и файлов по заказу: "+Project, "Пожалуйста, дождитесь завершения передачи данных ...", false, TimeRefresh, "note", 0);
	}
	
	if (nax) OutReply = GetLinkAlert();
	
	if (!nax && !nuse) {
					// var ObjExport = GetObjects(PathKMD);
					// var Objects = GetObjReports(ObjExport.ObjReports, false, true);
					// var ObjOut = new Object();
					// for (var i in ObjReports)
					// {
						// if (typeof(ObjReports[i])=="object") continue;
						// if (ObjReports[i] && Objects.ObjReports.hasOwnProperty(i)) ObjReports[i] = SetObject(ObjReports[i], Objects.ObjReports[i], ObjStructure, true);
					// }
				
				// console.log(ObjStructure);
				// console.log(ObjReports);
				// console.log(Objects.ObjReports);
				
		var Objects = GetObjReports(ObjReports, ObjFill, true);
		if (!Objects) {
			NoteEventAlert("Событие: Экспорт данных и файлов завершился - неудачно !!!", "Отправляемые данные не актуальны. Пожалуйста, пересоздайте отчеты и повторите попытку", false, TimeRefresh, "error", 0);
			Refresh(TimeRefresh);
			return;
		}
		
		OutReply = GoCreateStructure(PathExport, [Project, Project+"/"+Repository, Project+"/"+Repository+"/"+User]);
		OutReply = GoCreateStructure(PathExport+"/"+Project, GetArrStructure(ObjStructure));
	}
	
	try	{
		if (!nax && !nuse && OutReply) {
			SaveStreamFile(JSON.stringify(Objects.ObjReports), PathExport+"/"+Project+Repository+User+"/"+Project+".json");
			ExportFiles(GetFindPath(PathExport, "/").PathRoot, Objects.ObjFill);
			var BuildData = SetBuildData(PathExport+"/"+Reports+Repository, Objects.ObjReports);
			if (BuildData.length) {
				OutReply = BuildData[0];
			} else {
				OutReply = false;
			}
		} else if (OutReply) {
			OutReply = false;
			xhr.open("GET", PathProcess+"/"+"ExportData?project="+encodeURI(Project)+"&user="+encodeURI(UserID)+"&repository="+encodeURI(Repository), false);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) OutReply = decodeURI(xhr.responseText);			
			};
			xhr.send();
		}
	} catch (error) {
		OutReply = false;
	}

	if (OutReply) OutReply = GetLoadFile(PathProject, PathExport, OutReply);
	
	if (!OutReply && !EventError.hasOwnProperty("Экспорт данных и файлов завершился - неудачно !!!")) EventError["Экспорт данных и файлов завершился - неудачно !!!"] = "Перед повторным экспортом обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы всегда можете посмотреть наличие файлов в XML-исходниках";
	
	ErrorNumber = ErrorNumber+GetEventError(EventError, 0, TimeRefresh);
	
	if (OutReply) {
		var LockOut = GetFindFile(false, PathReports, ".lock", false);
		var OutJSON = GetFindFile(false, PathReports.replace(Reports, UserID), Project+".json", false);
		
		if (!nax && !nuse) {
			if (LockOut) fso.DeleteFile(LockOut);
			if (OutJSON) fso.CopyFile(OutJSON, PathExport+"/"+Project+"/"+UserID+"/"+Project+".json");
			if (GetFindFile(false, PathExport+"/"+Project+"/"+UserID, Project+".json")) fso.DeleteFile(OutJSON);
		}
			
		if (!ErrorNumber) {
			NoteEventAlert("Событие: Экспорт данных и файлов завершился - успешно", "Перед повторным экспортом обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы можете посмотреть наличие файлов в XML-исходниках", false, TimeRefresh, "note", 0);
		} else {
			NoteEventAlert("Событие: Экспорт данных и файлов завершился - с ошибками !", "Перед повторным экспортом обновите страницу по клавише \"F5\" или дождитесь автоматического обновления через: "+ceil5(TimeRefresh*0.001)/60+" мин. Это необходимо для очищения КЭШа. Вы можете посмотреть наличие файлов в XML-исходниках", false, TimeRefresh, "warning", 0);
		}
		
		if (confirm("Перейти по ссылке и открыть страницу с экспортированной транзакцией для проекта ["+Project+"] ?")) {
			window.open(OutReply);
		} else {
			//OutReply;
			NoteEventAlert("Событие: Ссылка на транзакцию скопирована в буфер обмена", "Вы можете поделиться ссылкой с другими участниками проекта или отправить им XML-исходники, теперь она связана с Вашими отправленными файлами", false, TimeRefresh, "note", 0);
		}
	}
	
	Refresh(TimeRefresh);
}

function ExportFiles(PathOut, ObjIn, ApplyIn, ApplyOut)
{
	if (typeof(ApplyIn)=="undefined") ApplyIn = true;
	if (typeof(ApplyOut)=="undefined") ApplyOut = true;
	var FileUser = false;
	for (var FileIn in ObjIn) {
		if (FileIn == "TXT" || FileIn == "XML") ApplyIn = false;
		if (FileIn == "DG" || FileIn == "TXT") ApplyOut = false;
		
		if (FileIn.indexOf("../") + 1) {
			for (var i = 0; ObjIn[FileIn] && (i < ObjIn[FileIn].length); i++)
			{
				FileUser = GetFindFile(false, PathReports, FileIn);
				if (FileUser) {
					var FileExport = GetFileIn(PathOut+"/"+ObjIn[FileIn][i]);
					if (GetFindFile(PathOut, PathOut, ObjIn[FileIn][i])) {
						try {
							fso.DeleteFile(FileExport.FilePath);
						} catch (error) {
							if (GetFindFile(PathOut, PathOut, ObjIn[FileIn][i])) {
								if (!EventError.hasOwnProperty("Ошибка экспорта файла ("+FileExport.File+")")) EventError["Ошибка экспорта файла ["+FileExport.File+"]"] = "Возможно файл открыт другим пользователем... Обратитесь к разработчику инструмента";
								continue;
							}
						}
					}
					
					try {
						if (!fso.FolderExists(FileExport.FileParentFolder)) fso.CreateFolder(FileExport.FileParentFolder);
						if (fso.FolderExists(FileExport.FileParentFolder)) fso.CopyFile(FileUser, FileExport.FilePath);
					} catch (error) {
						if ((!fso.FolderExists(FileExport.FileParentFolder) || !GetFindFile(PathOut, PathOut, ObjIn[FileIn][i])) && (!EventError.hasOwnProperty("Ошибка экспорта файла ["+FileExport.File+"]"))) EventError["Ошибка экспорта файла ("+FileExport.File+")"] = "Не удалось записать файл... Обратитесь к разработчику инструмента";
						continue;
					}
					
					try {
						if (GetFindFile(PathExport, PathOut, ObjIn[FileIn][i])) {
							if (ApplyOut) fso.DeleteFile(FileUser);
							ObjIn[FileIn].splice(i,1);
							if (!ObjIn[FileIn].length) delete ObjIn[FileIn];
						} else {
							if (!EventError.hasOwnProperty("Ошибка экспорта файла ["+FileExport.File+"]")) EventError["Ошибка экспорта файла ("+FileExport.File+")"] = "Не удалось записать файл... Обратитесь к разработчику инструмента";
						}
					} catch (error) {
						if (!EventError.hasOwnProperty("Ошибка экспорта файла ["+FileExport.File+"]")) EventError["Ошибка экспорта файла ("+FileExport.File+")"] = "Не удалось записать файл... Обратитесь к разработчику инструмента";
						continue;
					}
					
				} else if (ApplyIn) {
					var FileOut = GetFileIn(FileIn);
					if (!EventError.hasOwnProperty("Ошибка экспорта файла ["+FileOut.File+"]") && !(FileIn.indexOf("DWG_Drawings") + 1)) EventError["Ошибка экспорта файла ["+FileOut.File+"]"] = "Файл не найден";
					continue;
				}
			}
		} else if (typeof(ObjIn[FileIn]) == "object") {
			ExportFiles(PathOut, ObjIn[FileIn], ApplyIn, ApplyOut);
		}
	}
	
	try {
		if (ApplyOut && FileUser) fso.DeleteFolder(fso.GetParentFolderName(FileUser));
	} catch (error) {
		if (!EventError.hasOwnProperty("Ошибка очищения буфера ["+FileUser+"]")) EventError["Ошибка очищения буфера ["+FileUser+"]"] = error.message+" - данная ошибка не критична";
	}
}

try {	
	npro = false;
	Object.defineProperty(Object.prototype, 'GetValueMSXML', {
		enumerable: false,
		value: function(ValueIn)
			{
				var ValueOut = (this[ValueIn]) ? this[ValueIn] : this[ValueIn.toUpperCase()];
				if (ValueOut) {
					return ValueOut;
				} else {
					return "";
				}			
			}
	});
} catch (error) {
	npro = true;
	//if (nnod && !EventError.hasOwnProperty("("+error.message+")")) EventError["("+error.message+")"] = "Обратитесь к разработчику инструмента";
}

function GetValueMSXML(ValueIn)
{
	var ValueOut = (this[ValueIn]) ? this[ValueIn] : this[ValueIn.toUpperCase()];
	if (ValueOut) {
		return ValueOut;
	} else {
		return "";
	}			
}

try {
	exports.SetBuildData = SetBuildData;
	exports.GetBuildData = GetBuildData;
} catch (e) {
	nnod = (!nax) ? true : e instanceof ReferenceError;
}