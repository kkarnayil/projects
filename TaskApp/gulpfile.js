var gulp = require('gulp');
var bs   = require('browser-sync');
var jqueryLib = './node_modules/jquery/dist/jquery.min.js';

gulp.task("hello",function(){
	
	console.log("hey Gulp!");
	
});

gulp.task("build",function(){
	
	gulp.src("source/**/*.*").pipe(gulp.dest("dist"));
	gulp.src(jqueryLib).pipe(gulp.dest("dist/libs/js"));
	
});

gulp.task("watch", ['build', 'bsinit'], function(){
	
	gulp.watch("source/**/*.*",['build'], bs.reload());
	
});

gulp.task("bsinit",function(){
	bs.init({
		server: 'dist'
	});
});