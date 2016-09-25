const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const paths = require('./config.js').gulpfile;

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
// Used toJson to automate creating the JSON array in the event future pngs are ever added to the images
gulp.task('tojson', function() {
  gulp.src(paths.images)
  .pipe($.toJson({
      filename: `${paths.js}/images.json`,
      strip: /^.+\/?\\?client\/?\\?/
    }))
});

gulp.task('default', cb => runSequence('sass', ['serve:dev', 'watch'], cb));
