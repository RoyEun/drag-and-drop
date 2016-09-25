const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const paths = require('./config.js').gulpfile;

// gulp.task('bower', () => gulp.src(['./bower.json']).pipe($.install()))

gulp.task('clean:build', () => del([paths.build], { dot: true }));
// gulp.task('clean:dist', () => del([paths.dist], { dot: true }));

gulp.task('inject', (cb) => {
  runSequence('inject:css', cb);
});

gulp.task('inject:css', () => {
  const injectStyles = gulp.src([paths.mainStyle], { read: false })
    .pipe($.sort());

  const injectOptions = {
    // ignorePath: [paths.client],
    starttag: '<!-- injector:css -->',
    endtag: '<!-- endinjector -->',
  }
  return gulp.src(paths.mainView)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe(gulp.dest(paths.client));
});


gulp.task('sass', () => {
  return gulp.src(paths.mainSass)
    .pipe($.sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(`${paths.client}/assets/styles/`));
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

// gulp.task('default', cb => runSequence('sass', 'tojson'));

gulp.task('default', cb => runSequence('sass', 'inject', ['serve:dev', 'watch'], cb));
