module.exports=(function(){
	const fs=require("fs");
	const tsDir="../";

	// Ok, keyword arrays are not complete...
	const kw1=["class&nbsp;",":number",":string",":boolean","import&nbsp;","export&nbsp;",
		"let&nbsp;","var&nbsp;","const&nbsp;","&nbsp;implements&nbsp;","function&nbsp;",
		"&nbsp;return"];
	const kw2=["if","for","while","function"];
	const kw3=["@Component","@Input","@Output","@ViewChild","@Inject","@Pipe","@NgModule"];
	const kw1Span="<span style='color:blue'>";
	const kw2Span="<span style='color:blue'>";
	const kw3Span="<span style='color:brown'>";
	
	String.prototype.replaceAll = function(search, replacement) {
		// Not the most efficient method but convenient for this purpose
		// RegExp approach would be rather complicated with string containing html entities
		return this.split(search).join(replacement);
	};

	function parseTypescript(data){
		data=data.replaceAll("<","&lt;");
		data=data.replaceAll(" ","&nbsp;");
		data=data.replaceAll("\t","&nbsp;&nbsp;&nbsp;&nbsp;")
		data=data.replaceAll("\n","<br />");
		// data=data.replaceAll("{","<b>{</b>");
		// data=data.replaceAll("}","<b>}</b>");
		for(var i=0;i<kw1.length;i++){
			data=data.replaceAll(kw1[i],kw1Span+kw1[i]+"</span>");
		}
		for(var i=0;i<kw2.length;i++){
			data=data.replaceAll(kw2[i]+"(",kw2Span+kw2[i]+"</span>(");
		}
		for(var i=0;i<kw3.length;i++){
			data=data.replaceAll(kw3[i],kw3Span+kw3[i]+"</span>");
		}
		data=data.replaceAll("/*","<span style='color:green; font-weight:bold;'>/*");
		data=data.replaceAll("*/","*/</span>")
		return data;
	}

	function isSource(fn){
		if (fn.endsWith(".ts")) return true;
		if (fn.endsWith(".js")) return true;
		if (fn.endsWith(".jsx")) return true;
		return false;
	}
	
	return function(filename,callback){
		fs.readFile(tsDir+filename,function(err,data){
			if (err) callback(404,"No data");
			else{
				if (isSource(filename)) 
					data=parseTypescript(String(data));
				callback(200,data);
			}
		});
	}
})();