const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

const paths = {};
paths.client = 'client';
paths.build = 'build';
paths.assets = `${paths.client}/src/assets/**/*`;
paths.mainSass = `${paths.client}/src/assets/scss/styles.scss`;
paths.sass = `${paths.client}/src/assets/scss/**/*.scss`;
paths.mainStyle = `${paths.client}/src/assets/styles/styles.css`;
paths.images = `${paths.client}/src/assets/img/*.png`;
paths.mainView = `${paths.client}/index.html`;

gulp.task('sass', () => {
  return gulp.src(paths.mainSass)
    .pipe($.sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(`${paths.client}/src/assets/styles/`));
});

gulp.task('serve:dev', () => {
  $.connect.server({
    name: 'dev server',
    root: [paths.client, paths.build],
    port: 8000,
    livereload: true,
    fallback: `${paths.client}/index.html`,
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass']);

  const watchedSources = [
    paths.mainStyle,
  ];

  $.watch(watchedSources).pipe($.connect.reload());
});

// https://www.npmjs.com/package/gulp-to-json
// Use gulp task toJson to automate creating the JSON array in the event future pngs are ever added to the images folder
gulp.task('tojson', function() {
  gulp.src(paths.images)
  .pipe($.toJson({
      filename: `${paths.client}/images.json`,
      strip: /^.+\/?\\?client\/?\\?/
    }))
});

gulp.task('prefix-css', () =>
    gulp.src('./client/src/assets/styles/*.css')
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./client/dist'))
);

gulp.task('minify', function () {
    gulp.src('./client/src/**/*.js')
        .pipe($.jsmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('./client/dist'));
});

gulp.task('dist', cb => runSequence('tojson', 'prefix-css', 'minify'));
gulp.task('default', cb => runSequence('sass', ['serve:dev', 'watch'], cb));
