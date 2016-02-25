var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ts = require('gulp-typescript');

gulp.task('scss', function() {
   return gulp.src('scss/**/*.scss')
     .pipe(sourcemaps.init())
     .pipe(sass())
     .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
     .pipe(concat("bundle.min.css"))
     .pipe(cssnano())
     .pipe(sourcemaps.write('.'))
     .pipe(gulp.dest('dist/'));
});

gulp.task('typescript', function() {
  return gulp.src('js/**/*.ts')
    .pipe(ts({
			noImplicitAny: true,
			out: 'bundle.js'
		}))
		.pipe(gulp.dest('dist/'));
});


gulp.task('watch', ['scss'], function () {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('js/**/*.ts', ['typescript']);
});

gulp.task('default', ['watch']);
