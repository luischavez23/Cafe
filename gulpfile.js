const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css(done){
    //SASS compile
    //1. Identify files {src} = gulp  2.Compile sass 3.Save files {dest}
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( dest('build/css') )

    done();
}

function dev(){
    watch('src/scss/**/*.scss', css);
}


exports.css = css;
exports.dev = dev;
exports.default = series( css, dev );