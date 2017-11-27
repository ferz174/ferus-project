function GetRoute(Direct, PathURL, GetOut, GetUrl) {
	if (typeof Direct[PathURL] === 'function') {
		Direct[PathURL](GetOut, GetUrl);
	} else {
		console.log("Server tsms - "+PathURL+" - false");
		GetOut.writeHead(404, {"Content-Type": "text/plain"});
		GetOut.write("404 Not found");
		GetOut.end();
	}
}

exports.GetRoute = GetRoute;