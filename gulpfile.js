const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function stream() {
	browserSync.init({
		server: {
			baseDir: "./src/"
		}
	});
	watch('./src/sass/**/*.sass', styles);
	watch('./src/*.html').on('change', browserSync.reload);
}

function styles(){
	return src('./src/sass/style.sass')
		.pipe(sass({indentType: 'tab', indentWidth: 1, outputStyle: 'expanded'}))
		.pipe(dest('./src/css/'))
		.pipe(browserSync.stream());
}

exports.styles = styles;
exports.stream = stream;

exports.default = series(parallel(styles), stream);