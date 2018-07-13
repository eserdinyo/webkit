const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const pug = require('gulp-pug');
const reload = browserSync.reload;

//Files Paths
var paths = {
  SCSS_SRC: "./dev/styles/**/*.scss",
  SCSS_DEST: "./www/assets/css/"
};

//Reload the page automaticly
gulp.task("browser-sync", function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./www/"
    }
  });
  gulp.watch('./dev/views/**/*.pug', ['html'])
  gulp.watch('./dev/styles/**/*.scss', ['scss'])
  gulp.watch('./dev/js/**/*.js', reload)
});

//SASS dosyalarını CSS'e dönüştür
gulp.task("scss", function() {
  return gulp
    .src(paths.SCSS_SRC)
    .pipe(plumber([{ errorHandler: false }]))
    .pipe(sass().on("error", sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest(paths.SCSS_DEST))
    .pipe(browserSync.stream());
});

//PUG dosyalarını HTML'e dönüştür
gulp.task('html', () => {
  return gulp.src('./dev/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('www'))
  .on('end', reload)
})



gulp.task("default", ["browser-sync","html","scss"]);
