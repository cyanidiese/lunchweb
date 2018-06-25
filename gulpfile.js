var gulp = require('gulp'),
    gzip = require('gulp-gzip'),
    del = require('del');


gulp.task('gzip-browser', function () {

    gulp.src('./dist/*.js')
        .pipe(gzip())
        .pipe(gulp.dest('./dist'));
});

gulp.task('gzip-server', function () {

    gulp.src('./dist-server/*.js')
        .pipe(gzip())
        .pipe(gulp.dest('./dist-server'));
});

gulp.task('default', ['gzip-browser', 'gzip-server']);
