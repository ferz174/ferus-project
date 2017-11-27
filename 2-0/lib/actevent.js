function GetEventTime(EventTime)
{
try {
	Reset = true;
	NumberWarning = 0;
	if (!EventTime) EventTime = 600000; //4 час. 10 мин.
	
	var TimeWarning = (EventTime*0.001)/60;
	
	setInterval(function()
	{
		NumberWarning += 1;
		NoteEventAlert("Событие: Обновление данных не выполнялось более "+ceil5(TimeWarning*NumberWarning)+" мин.", "Данные могут быть не актуальны, но вы можете обновить страницу по клавише \"F5\"", false, EventTime-500, "warning");
	}, EventTime);
	
	setInterval(function()
	{
		if (Reset) {
			NoteEventAlert("Событие: Обновление данных не выполнялось более "+ceil5(TimeWarning*(NumberWarning+1))+" мин.", "Данные не актуальны. Сбросить счетчик обновления или обновить страницу?", true, (EventTime-500)*5, "attention");
		} else {
			NoteEventAlert("Событие: Обновление данных не выполнялось более "+ceil5(TimeWarning*(NumberWarning+1))+" мин.", "Данные не актуальны. Счетчик обновления сброшен.", false, (EventTime*5)-500, "attention");
		}
	}, EventTime*5);
	
	setInterval(function()
	{
		if (Reset) {
			var TimeRefresh = 10000;
			NoteEventAlert("Событие: Обновление данных не выполнялось более "+ceil5(TimeWarning*(NumberWarning+1))+" мин.", "Данные не актуальны. Страница будет автоматически обновлена через: "+TimeRefresh*0.001+" сек.", false, (EventTime*5*5)-500, "note");
			setInterval(function () { location.reload(); }, TimeRefresh);
		} else {
			NoteEventAlert("Событие: Обновление данных не выполнялось более "+ceil5(TimeWarning*(NumberWarning+1))+" мин.", "Данные не актуальны! Страница будет автоматически обновлена через: "+ceil5(TimeWarning*5*5)+" мин." , true, (EventTime*5*5)-500, "error");
			Reset = true;
		}
	}, EventTime*5*5);
} catch (error) {
	if (!EventError.hasOwnProperty("Ошибка таймера ("+error.message+")")) EventError["Ошибка таймера ("+error.message+")"] = "Обратитесь к разработчику инструмента";
}
}

function Refresh(TimeRefresh)
{
	setTimeout(function ()
	{
		window.location.replace(window.location);
	}, TimeRefresh);
}

function GetEventError(EventError, PositionY, TimeRefresh)
{
	var ErrorNumber = 0;
	if (!TimeRefresh) TimeRefresh = 30000;
	for (var i in EventError)
	{
		NoteEventAlert("Событие: "+i+"", ""+EventError[i]+"", false, TimeRefresh, "error", PositionY);
		ErrorNumber =+ 1;
	}
	
	return ErrorNumber;
}

function GetNoteError(NoteError, StrTD, NoteID)
{
	if (NoteError.hasOwnProperty(NoteRemove)) {
		StrTD[NoteID].parentElement.style.textDecoration = "line-through";
		StrTD[NoteID].parentElement.style.color = "#c3c3c3";
		StrTD[NoteID].innerHTML = NoteRemove;
	} else {
		StrTD[NoteID].parentElement.style.textDecoration = "";
		StrTD[NoteID].parentElement.style.color = "";
		for (var i in NoteError)
		{
			StrTD[NoteID].innerHTML = i;
			StrTD[NoteID].bgColor = NoteError[i];
		}
	}
}

function GetLinkAlert()
{
try {
	xhr.open("GET", PathProcess+"/"+"GetUp?project="+encodeURI(Project)+"&user="+encodeURI(UserID)+"&repository="+encodeURI(Repository), false);
	xhr.send();
	if (xhr.readyState == 4 && xhr.status == 200) return xhr.responseText;
	return false;
} catch (error) {
	if (!EventError.hasOwnProperty("Не удалось подключиться к обработчику ("+error.message+")")) EventError["Не удалось подключиться к обработчику ("+error.message+")"] = "Обратитесь к разработчику инструмента";
	return false;
}
}

function ceil5(num)
{
	return Math.ceil(num/5)*5;
}

function NoteEventAlert(head, text, buttons, TimeDelay, ClassName, up, right)
{
	/* если div с ID == note_event_alerts_holder не найден
	 * (окошко вызывается впервые), то создаем необходимые div'ы 
	*/
	//console.log(head+": "+text);
	if (!document.getElementById("note_event_alerts_holder")) {

		var NoteEventAlertOuter = document.createElement("div");
		NoteEventAlertOuter.className = "note_event_alert_outer";
		document.getElementById("Document").appendChild(NoteEventAlertOuter);
		
		var NoteEventAlertFrame = document.createElement("div");
		NoteEventAlertFrame.className = "frame";
		NoteEventAlertOuter.appendChild(NoteEventAlertFrame);
		
		var NoteEventAlertsHolder = document.createElement("div");
		NoteEventAlertsHolder.id = "note_event_alerts_holder";
		NoteEventAlertsHolder.className = "note_event_alerts_holder";
		NoteEventAlertFrame.appendChild(NoteEventAlertsHolder);
	}

	var NoteEventAlert = document.createElement("div");
	NoteEventAlert.className = "note_event_alert " + ClassName;
	document.getElementById("note_event_alerts_holder").appendChild(NoteEventAlert);
	NoteEventAlert.id = "note_event_alert";

	var NoteEventAlertHeader = document.createElement("div");
	NoteEventAlertHeader.className = "note_event_alert_header";
	NoteEventAlert.appendChild(NoteEventAlertHeader);
	NoteEventAlertHeader.innerHTML = head;
	
	var NoteEventAlertText = document.createElement("div");
	NoteEventAlertText.className = "note_event_alert_text";
	NoteEventAlert.appendChild(NoteEventAlertText);
	NoteEventAlert.style.position = "relative";
	NoteEventAlertText.innerHTML = text;
	NoteEventAlert.style.display = "block";

	if (up) {
		NoteEventAlert.style.top = up-GetVerticalScroll();
	} else {
		NoteEventAlert.style.top = GetVerticalScroll();
	}
		
	if (buttons) {
		var NoteEventAlertRefreshButton = document.createElement("a");
		NoteEventAlertRefreshButton.href = "#";
		NoteEventAlertRefreshButton.className = "note_event_alert_refresh_button";
		NoteEventAlertRefreshButton.onclick = function(ev) {
			if (!ev) {
				ev = window.event;
				location.reload();
			}
		}
		NoteEventAlert.appendChild(NoteEventAlertRefreshButton);
		var NoteEventAlertRefreshButtonIcon = document.createElement("img");
		NoteEventAlertRefreshButtonIcon.src = PathIMGMain+"/refresh.png";
		NoteEventAlertRefreshButtonIcon.alt = "Обновить";
		NoteEventAlertRefreshButton.appendChild(NoteEventAlertRefreshButtonIcon);
		
		var NoteEventAlertResetButton = document.createElement("a");
		NoteEventAlertResetButton.href = "#";
		NoteEventAlertResetButton.className = "note_event_alert_reset_button";
		NoteEventAlertResetButton.onclick = function(ev)
		{
			if(!ev) ev = window.event;
			
			if (!document.all) ev.preventDefault(); else ev.returnValue = false;
			document.getElementById("note_event_alerts_holder").removeChild(NoteEventAlert);
			Reset = false;
			//NumberWarning = 0;
		}
		NoteEventAlert.appendChild(NoteEventAlertResetButton);
		var NoteEventAlertResetButtonIcon = document.createElement("img");
		NoteEventAlertResetButtonIcon.src = PathIMGMain+"/reset.png";
		NoteEventAlertResetButtonIcon.alt = "Сброс";
		NoteEventAlertResetButton.appendChild(NoteEventAlertResetButtonIcon);
	} else {
		//window.attachEvent("onclick", function(){
		//	document.getElementById("note_event_alerts_holder").removeChild(NoteEventAlert);
		//}, document.getElementById("note_event_alert"));
	}
	setTimeout(function () { document.getElementById("note_event_alerts_holder").removeChild(NoteEventAlert); }, TimeDelay);
}

function GetScreenRows()
{
	var ScreenRows;
	if (self.innerHeight) {
		   ScreenRows = Math.ceil(self.innerHeight/23);
	} else if (document.documentElement && document.documentElement.clientHeight) {
		   ScreenRows = Math.ceil(document.documentElement.clientHeight/23);
	} else if ((document.body || document.documentElement)) {
		   ScreenRows = Math.ceil((document.body || document.documentElement).clientHeight/23);
	}
	return ScreenRows;
}

function GetVerticalScroll()
{
	VerticalScroll = document.documentElement.scrollTop || (document.body || document.documentElement) && (document.body || document.documentElement).scrollTop || 0;
	VerticalScroll -= document.documentElement.clientTop;
	return VerticalScroll;
}