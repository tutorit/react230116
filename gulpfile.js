const gulp = require('gulp');

const browserify = require("browserify");
const babelify=require("babelify");
const source=require('vinyl-source-stream');

const appDir='wwwroot/app';

function build(dir,fn){
	let file=`./${dir}/${fn}.jsx`;
	let bundle=fn+".bundle.js";
	return browserify({
			entries: file,
			extensions: ['.jsx','.js'],
			debug: true
		})
		.transform(babelify.configure({presets: ["@babel/env","@babel/react"]}))
		.bundle()
		.on("error",err => {
			console.log("ERROR:",err.message);
			console.log(err.codeFrame);
		})
		.pipe(source(bundle))
		.pipe(gulp.dest(appDir));
}

function buildDemo(){
	return build("jsx","demo.app");
} 

function buildApp(){
	return build("app","app");
} 

exports.buildDemo=buildDemo;
exports.buildApp=buildApp;
exports.build=gulp.series(buildDemo,buildApp);
exports.default=buildDemo;
