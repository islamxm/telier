/* TECHNICAL OBJECTS */
let project_folder = require('path').basename(__dirname);
let source_folder = "#src";
let fs = require('fs');
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}






/* PLUGINS */
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const {src, dest} = require('gulp');
const { functions } = require('lodash');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const autopref = require('gulp-autoprefixer');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');




/* BROWSERSYNC */
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}





/* HTML */
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}



/* CSS */
function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autopref({
                overrideBrowserslist: ["last 10 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}


function images() {
    return src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 4, // 0 to 7
            svgoPlugins: [
                {
                    removeViewBox: false
                }
            ]
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

// function fonts() {
//     return src(path.src.fonts)
//         .pipe(dest(path.build.fonts));
// };





/* Change .otf format to .ttf format */
gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
})





/* Watching */
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);

}


/* Clean another files */
function clean() {
    return del(path.clean);
}







let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;



