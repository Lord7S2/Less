const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// ==========================
// Compilar SASS
// ==========================
function compilaSass() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}

// ==========================
// Minificar JavaScript
// ==========================
function comprimeJS() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}

// ==========================
// Comprimir imagens
// ==========================
function comprimeImagens() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

// ==========================
// Watch
// ==========================
function watchFiles() {
    gulp.watch('src/sass/**/*.scss', compilaSass);
    gulp.watch('src/js/*.js', comprimeJS);
}

// ==========================
// Exportações
// ==========================
exports.sass = compilaSass;
exports.js = comprimeJS;
exports.images = comprimeImagens;
exports.watch = watchFiles;

exports.default = gulp.parallel(compilaSass, comprimeJS, comprimeImagens);