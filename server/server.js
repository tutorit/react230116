let serverPort=9000, 
    webDir="../wwwroot";

let express = require('express');
let webSocketServer=require('./websocket');
let webApi=require('./webapi');
let ts2html=require('./code2html');
let demoservice=require('./demoservice');

let app = express();
app.use(express.static(webDir));
 
webSocketServer(serverPort+1)
webApi.init(app);  // Restful interface at /api/books
demoservice.init(app);  // Restful interface at /api/demo

/* Only needed occasionally to demonstrate form-post

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

app.post("/formdata",function(req,resp){
	var r="<html><body><h1>Server got the following data</h1><pre>";
	for(var k in req.body){
		r+=k+"="+req.body[k]+"\r\n";
	}
	r+="</pre></body></html>";
	resp.send(r);
});
*/

/* Needed to display demo-content */
app.get("/demo/*",function(request,response){
	var fn=request.path.substring(6);
	ts2html(fn,function(stat,data){
		response.status(stat).send(data);
	});
});

/* Needed for html5-style navigation

const path = require('path')
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, webDir, 'index.html'))
})

*/


app.listen(serverPort);
console.log('Server listening on http://localhost:'+serverPort);
console.log('Distributing site from: '+webDir);