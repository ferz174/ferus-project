var web = require("./web");
var router = require("./router");
var work = require("./work");

var Direct = {}
Direct["/"] = work.GetUp;
Direct["/GetUp"] = work.GetUp;
Direct["/TransferProject"] = work.GetTransferProject;
Direct["/TransferStructure"] = work.GetTransferStructure;
Direct["/TransferData"] = work.GetTransferData;
Direct["/ExportData"] = work.GetExportData;
Direct["/ExportAnnul"] = work.GetExportAnnul;

web.GetUp(router.GetRoute, Direct);