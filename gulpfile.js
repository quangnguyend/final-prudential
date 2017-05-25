var gulp = require('gulp')
var gutil = require('gulp-util')
var bower = require('bower')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var minifyCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var sh = require('shelljs')
var inject = require('gulp-inject')
var eslint = require('gulp-eslint')

var paths = {
  sass: ['./scss/**/*.scss']
}

gulp.task('default', ['sass', 'inject'])

gulp.task('inject', function () {
  var source = gulp.src([
    'www/css/*.css', 'www/lib/**/*.min.css',
    'www/lib/ionic/js/ionic.bundle.min.js', 'www/lib/**/*.min.js',
    'www/js/controllers/**/*.js',
    'www/js/services/**/*.js', 'www/js/*.js'])

  return gulp.src('www/index.html')
     .pipe(inject(source, {ignorePath: 'www'}))
     .pipe(gulp.dest('www'))
})

gulp.task('lint', () => {
  return gulp.src(['www/js/controllers/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('sass', function (done) {
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done)
})

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.sass, ['sass'])
})

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message)
    })
})

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    )
    process.exit(1)
  }
  done()
})
