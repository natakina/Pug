var gulp = require('gulp');
var plumber = require('gulp-plumber');

// connect
var connect = require('gulp-connect-multi')(); 

gulp.task('connect', connect.server({
    host: '127.0.0.1',
    root: ['site'],
    port: 9090,
    livereload: true,
    open: {
        browser: 'chrome'
    }
}));

//templates
var pug = require('gulp-pug');

gulp.task('templates', function(){
	gulp.src('./dev/pug/*.pug')
		.pipe(plumber())
		.pipe(pug({

		}))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

//styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', function(){
	gulp.src('./dev/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(prefix({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

//images
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
	gulp.src('./dev/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./site/images'))
		.pipe(connect.reload());
});

// watcher
gulp.task('watcher', function() {
    gulp.watch('pug/**/*.pug', {cwd:'./dev/'}, ['templates']);
    gulp.watch('scss/*.scss', {cwd:'./dev/'}, ['styles']);
    gulp.watch('js/*.js', {cwd:'./dev/'}, ['scripts']);
    gulp.watch('images/**/*.{png,jpg,jpeg,gif,svg}', {cwd:'./dev/'}, ['images']);
});

gulp.task('default', ['templates', 'styles', 'images']);
gulp.task('dev', ['default', 'connect', 'watcher']);