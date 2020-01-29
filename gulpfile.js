const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./src/"
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('./src/*.html').on('change', browserSync.reload);
	gulp.watch('./src/sass/**/*.sass', gulp.parallel('sass'));
});

gulp.task('sass', function(){
	return gulp.src('./src/sass/style.sass')
		.pipe(sass({indentType: 'tab', indentWidth: 1, outputStyle: 'expanded'}))
		.pipe(gulp.dest('./src/css/'))
		.pipe(browserSync.stream());
});

gulp.task('default', gulp.series('sass', gulp.parallel('server', 'watch')));