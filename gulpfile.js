var gulp = require("gulp"),
    cached  = require('gulp-cached'),
    gulp_babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    watch = require("gulp-watch");
var mocha = require('gulp-mocha');

gulp.task("es6", function() {
    return gulp.src("src/**/*.js")
        .pipe(cached('es6'))
        .pipe(sourcemaps.init())
        .pipe(gulp_babel()).on("error", function (error) {
            console.log(error.toString());
            this.emit("end");
        })
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("lib"));
});

gulp.task('test', function () {
    return gulp.src('test/tests.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

// The watch tasks first cleans the lib directory before starting to watch for changes
gulp.task("watch", [], function() {
    watch("src/**/*.js", {ignoreInitial: false}, function() {
        gulp.start("es6");
    });
});

gulp.task("default", ["watch"]);



