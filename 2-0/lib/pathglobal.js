GetPathGlobal();

var PathReTMUS = "//win-inet";
var PathFileReTMUS = PathReTMUS+"/tsms/restart";
var PathSrvModels = "//tekla-1";
var PathModels = PathSrvModels+"/TeklaStructuresModels";
var PathShell = "//tsms/"+VersionShell;
var PathLib = PathShell+"/lib";
var PathMain = PathShell+"/main";
var PathMat = PathShell+"/materials";
var PathPlugsDesc = PathMat+"/plugs";
var PathComsDesc = PathMat+"/coms";
var PathModelsTmp = PathModels+"/tmp";
var PathModelsArch = PathModels+"/archive";
var PathComs = PathShell+"/coms";

var PathPlugs = PathShell+"/plugs";

var PathModelsShell = PathShell + "/index.html";
var FileModels = "TeklaStructuresModels.xml";
//var PathTWW = PathMain+"/TeklaWebViewer.html";
var PathAssView = "main/AssemblyViewer.html";
var PathCom = PathMat+"/coms/index.html";
var PathPlug = PathMat+"/plugs/index.html";
var PathFAQ = PathMat+"/faq/index.html";
var PathReq = PathMat+"/requests/index.html";
var PathDev = PathMat+"/dev/index.html";
var PathManOpro = PathMat+"/opro/index.html";
var PathManTekla = PathMat+"/tekla/index.html";
var PathManEnv = PathMat+"/env/index.html";

var PathIMGMain = "img/main";

var PathIMGPlugs = "/img/plugs";
var PathIMGComs = "/img/coms";
var PathIMGOpro = "/img/materials/opro";
var PathIMGTekla = PathShell+"/img/materials/tekla";
var PathIMGFAQ = PathShell+"/img/materials/faq";

var FileComsDesc = PathComsDesc+"/coms.txt"
var FilePlugsDesc = PathPlugsDesc+"/plugs.txt"

var PathCAD = "//ntserver2/buffer/sapr";

var PathExportBak =  PathSrvModels+"/tsm$";

var PathTemp = "//tsms/temp";

var PathOpro = "http://192.168.1.33:8080";
var WorkGraph = "http://192.168.1.33:8090";

var XML_PDF = "//tsms/2-0/fop/bin/xml-pdf.exe";

var PathInfoModels = "/inf_model";
var ModelsTechReq = PathInfoModels+"/techreq/techreq.txt";
var PathTechReq = "inf_model/techreq";

//var ModelsTechReq = "//tekla-1/metcon20$/model_templates/standard/INF_Model/TechReq/TechReq.txt";
var PathInfoBolts = PathInfoModels+"/boltsnotes";
var BoltsNotesShop = PathInfoModels+"/boltsnotes/shop.txt";

function GetPathGlobal()
{
	PathProcess = "http://"+NameShell+":"+PortShell;
	PathTmp = "tmp/tmp";
	PathConsol = "consol";
	PathExport = "export/tmp";
	PathTransfer = "transfer/tmp";
	if (nax) {
		Resource = "http://"+NameShell+"/"+VersionShell;
	} else {
		Resource = "file://"+NameShell+"/"+VersionShell;
	}
	
	Reports = "Reports";
	Exp = "exp";
}

function GetMain(PathMain)
{
	alert("Переход к странице моделей - в разработке ...");
}

try {
	exports.GetPathGlobal = GetPathGlobal;
} catch (error) {
	nnod = (!nax) ? true : error instanceof ReferenceError;
}