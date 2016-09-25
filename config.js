const paths = {
  html: {},
  gulpfile: {},
};

paths.gulpfile.client = 'client';
paths.gulpfile.build = 'build';
paths.gulpfile.assets = `${paths.gulpfile.client}/src/assets/**/*`;
paths.gulpfile.mainSass = `${paths.gulpfile.client}/src/assets/scss/styles.scss`;
paths.gulpfile.sass = `${paths.gulpfile.client}/src/assets/scss/**/*.scss`;
paths.gulpfile.mainStyle = `${paths.gulpfile.client}/src/assets/styles/styles.css`;
paths.gulpfile.images = `${paths.gulpfile.client}/src/assets/img/*.png`;
paths.gulpfile.js = `${paths.gulpfile.client}/src/assets/js`;
paths.gulpfile.mainView = `${paths.client}/index.html`;

module.exports = paths;
