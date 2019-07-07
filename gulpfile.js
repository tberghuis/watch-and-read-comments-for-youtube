var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('watch-popup-dev', function () {
	// Endless stream mode
    return watch('src/popup/*', { ignoreInitial: false })
        .pipe(gulp.dest('dist-dev'));
});

