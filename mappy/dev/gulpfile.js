var syntax = 'sass'; // Syntax: sass;

var gulp         = require('gulp'),
	gutil        = require('gulp-util'),
	sass         = require('gulp-sass'),
	sourcemaps 	 = require('gulp-sourcemaps');
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	cleancss     = require('gulp-clean-css'),
	rename       = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify       = require('gulp-notify'),
	pug          = require('gulp-pug'),
	del          = require('del'),
	dest         = require('gulp-dest'),
	plumber      = require('gulp-plumber'),
	svgSprite    = require('gulp-svg-sprite'),
	svgmin       = require('gulp-svgmin'),
	cheerio      = require('gulp-cheerio'),
	replace      = require('gulp-replace'),
	through2     = require('through2');

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: '../'
		},
		notify: false
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		//tunnel: true, tunnel: "work" // Demonstration page: http://projectname.localtunnel.me
	});
});

//SVG

// npm install gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace -g
// npm link gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace

gulp.task('svgSpriteBuild', function () {
	return gulp.src('assets/img/svg/for-sprite/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../sprite.svg',
					render: {
						scss: {
							dest: '../../../../sass/mixins/_sprite.scss',
							template: 'sass/options/_sprite_template.scss'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('assets/img/sprite/'));
});
gulp.task('svgSprite', ['svgSpriteBuild']);

//PUG
gulp.task('pug', function () {
	return gulp.src('pug/page/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('../'));
	// .pipe(browserSync.reload({
	// 	stream: true
	// }));
});

//Style
gulp.task('styles', function () {
	return gulp.src(syntax + '/styles.' + syntax)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))

		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer(['last 15 versions']))
		//.pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging

		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('../css'))

		//gulp.styles('../css/*.css', ['media'])

		.pipe(browserSync.stream());
});

gulp.task('media', function () {
	'use strict';
	const fs = require('fs');
	const mqpacker = require('css-mqpacker');

	const result = mqpacker.pack(fs.readFileSync('../css/styles.min.css', 'utf8'), {
		from: '../css/styles.min.css',
		map: {
			inline: false
		},
		sort: true,
		to: '../css/styles.min.css'
	});
	fs.writeFileSync('../css/styles.min.css', result.css);
	fs.writeFileSync('../css/styles.min.css.css.map', result.map);
});

//js
gulp.task('js', function () {
	return gulp.src([
		'libs/tinyslider/tiny-slider.js',
		'js/scripts.js' // Always at the end
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('../js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function () {
	del.sync(['../assets'], {force: true}); // Удаляем папку assets

	var buildAssets = gulp.src(['!assets/img/svg/for-sprite/**/*', '!assets/img/svg/for-sprite/', 'assets/**/*']) // Берем папку
		.pipe(gulp.dest('../assets')); // Выгружаем на уровень выше
});



//Watch
gulp.task('watch', ['clean', 'styles', 'pug', 'js', 'browser-sync'], function () {

	gulp.watch(syntax + '/**/*.' + syntax + '', ['styles']);
	gulp.watch('pug/**/*.pug', ['pug']);
	gulp.watch(['libs/**/*.js', 'js/scripts.js'], ['js']);
	gulp.watch('../*.html', browserSync.reload);

	gulp.watch('assets/img/**/*', ['clean'], browserSync.reload);
});

gulp.task('default', ['watch']);

