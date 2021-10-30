const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

//Images
const image = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done){
    //SASS compile
    //1. Identify files {src} = gulp  2.Compile sass 3.Save files {dest}
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( dest('build/css') )

    done();
}

function images(){
    return src('src/img/**/*')
    .pipe( image({optimizationLevel: 3}) )
    .pipe( dest('build/img') )
}

function versionWebp(){
    return src('src/img/**/*.{jpg,png}')
    .pipe(webp())
    .pipe(dest('build/img'))
}

function versionAvif(){
    const options = {
        quality: 50
    }
    return src('src/img/**/*.{jpg,png}')
    .pipe(avif( options ))
    .pipe(dest('build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images)
}


exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif
exports.default = series( css, dev );