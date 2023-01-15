module.exports=(function(){

	var mysql      = require('mysql');
	var pool      =    null;
	
	function where(def){
		var cond="";
		for(key in def){
			var sql="??=?";
			var item=mysql.format(sql,[key,def[key] ]);
			if (cond.length) cond+=" AND ";
			cond+=item;
		}
		if (cond.length) cond=" WHERE "+cond+" ";
		console.log(cond);
		return cond;
	}
	
	return {
		init: function(defs){
			if (pool) return;
			console.log("Initializing connection pool for: "+defs.protocol+"://"+defs.host+":"+defs.port+"/"+defs.database);
			pool=mysql.createPool(defs);
		},
		close: function(cb){
			pool.end(function(err){
				cb(err);
			});
		},
		get: function(table,def,cb){
			pool.getConnection(function(err,conn){
				if (err){
					if (conn) conn.release();
					cb({'error':err});
					return;
				}
				var cond=where(def);
				var q=conn.query("SELECT * FROM "+table+cond,function(err,rows,fields){
					conn.release();
					cb({'error': err,'fields':fields,'rows': rows});
				});
				console.log(q.sql);
				
			});
		},
		getAll: function(table,order,cb){
			pool.getConnection(function(err,conn){
				if (err){
					if (conn) conn.release();
					cb({'error':err});
					return;
				}
				var sql="SELECT * FROM "+table;
				if (order && order.length){
					sql+=" ORDER BY "+order;
				}
				conn.query(sql,function(err,rows,fields){
					conn.release();
					cb({'error': err,'fields':fields,'rows': rows});
				});
				
			});
		},
		update:function(table,pk,def,cb){
			console.log(pk);
			console.log(cb);
			pool.getConnection(function(err,conn){
				if (err){
					if (conn) conn.release();
					cb({'error':err});
					return;
				}
				var cond=where(pk);
				conn.query("UPDATE "+table+" SET ?"+cond,def,function(err,data){
					conn.release();
					cb({'error': err,'ok': data});
				});
			});
		},
		insert:function(table, values,cb){
			pool.getConnection(function(err,conn){
				if (err){
					if (conn) conn.release();
					cb({'error':err});
					return;
				}
				conn.query("INSERT INTO "+table+" SET ?",values,function(err,data){
					conn.release();
					cb({'error': err,'ok':data})
				});
			});
		},
		delete: function(table,def,cb){
			pool.getConnection(function(err,conn){
				if (err){
					if (conn) conn.release();
					cb({'error':err});
					return;
				}
				var cond=where(def);
				conn.query("DELETE FROM "+table+cond,function(err,data){
					conn.release();
					cb({'error': err,'ok': data});
				});
			});
		},
		execute: function(query,cb){
			pool.getConnection(function(err,conn){
				if (err){
					if (conn) conn.release();
					cb({'error':err});
					return;
				}
				var sql=query;
				if (typeof(sql)!="string"){
					sql="SELECT ";
					sql+=query.fields.reduce(function(a,b){
						if (typeof(a)=="string") return a+","+b.field;
						return a.field+","+b.field;
					});
					sql+=" FROM "+query.tables+" WHERE "+query.where+" ORDER BY "+query.order;
					console.log(sql);
				}
				conn.query(sql,function(err,rows,fields){
					conn.release();
					cb({'error': err,'rows': rows,'fields':fields});
				});
			});
			
		}
		
	};
	
})();
