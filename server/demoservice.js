module.exports={
	init:function(app){
		let apiroot="/api/demo";
		let bodyParser = require('body-parser');
		app.use(bodyParser.json());	
		
		let data=[
			{"greeting":"Hello","target":"world"},
			{"greeting":"Hi","target":"Tom"},
			{"greeting":"Good day","target":"sir"},
		];


		app.get(apiroot, function(req, res) {
			res.json(data);
		});

		app.get(apiroot+'/:id', function(req, res) {
			let id = Number(req.params.id);
		
			if ((id<0) || (id>=data.length)) {
				res.statusCode = 404;	// Not found
				res.json({extra:"Item was not found"});
			} else {
				res.json(data[id]);	// Ok, send it as JSON
			}

		});

		app.delete(apiroot+'/:id', function(req, res) {
			let id = Number(req.params.id);
			if ((id<0) || (id>=data.length)) {
				res.statusCode = 404;	// Not found
				res.json({extra:"Item was not found"});
			}
			else{
				let d=data.splice(id,1);
				d[0].extra="Deleted";
				res.json(d[0]);
			}
		});

		app.put(apiroot+"/:id",function(req,res){
			let id = Number(req.params.id);
			if ((id<0) || (id>=data.length)) {
				res.statusCode = 404;	// Not found
				res.json({extra:"Item was not found"});
			}
			else{
				var d=data.splice(id,1,req.body);
				res.json(Object.assign({},req.body,{extra:"Changed"}));
			}
		});

		app.post(apiroot,function(req,res){
			data.push(req.body);
			res.send(Object.assign({},req.body,{extra:"Added"}));
		});
		
	}
	
	
}
