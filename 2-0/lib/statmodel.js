function GetStatusModel(PathModel){
	var PathFileTMUS = PathModel+"/.This_is_multiuser_model";
	var PathFileLock = PathModel+"/.locked";
	if (fso.FileExists(PathFileTMUS)){
		StatusModel = "users";
		ReadFile = fso.openTextFile(PathFileTMUS, 1, false);
		Str = ReadFile.readAll().split("\r");
		ReadFile.Close();
		Str = Str[0].split(",");
		PortModel = parseInt(Str[1]);
		if (PortModel == "1244") {
			StatusModel = "tmp";
			return;
		}
		FindPort = findidx(DiapPort, PortModel);
		
		if(FindPort == -1){
			StatusModel = "users2";
		} else {
			DiapPort.splice(FindPort, 1);
		}
		return;
	}
	StatusModel = "user";
	if (fso.FileExists(PathFileLock)){
		StatusModel = "lock";
		return;
	}
	return;
}

function unlock(PathModel){
	alert(PathModel+"/.locked");
	var isUnlock = confirm("Разблокировать модель?\n Модель будет доступна для редактирования.");
	if(isUnlock){
		fso.DeleteFile(PathModel+"/.locked", true);
		location.reload();
	}
	return false;
}

function remusr(PortModel){
try {
		var MsgReMUST = confirm("ВНИМАНИЕ!!! Будет выполнена перезагрузка многопользовательского сервера: "+PortModel+"\nВыполнить перезагрузку?");
		if(MsgReMUST){
			if (fso.FileExists(PathFileReTMUS)) fso.DeleteFile(PathFileReTMUS, true);
			PathFileReTMUS = fso.CreateTextFile(PathFileReTMUS, false);
			PathFileReTMUS.WriteLine(PortModel);
			PathFileReTMUS.Close();
			alert("Перезагрузка сервера: "+PortModel+" - завершилась успешно");
			location.reload();
		}
	} catch(e) {
		alert("Перезагрузка сервера: "+PortModel+" - завершилась неудачей.\nМногопользовательский сервер не был перезагружен.\nПросьба обратиться к системному администратору.");
	}
}