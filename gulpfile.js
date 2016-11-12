/////////////////////////
//                     //
//     Gulpfile.js     //
//                     //
/////////////////////////

// Use [npm install --dev] to install the following dependencies:
// As of 3.5 use --only=dev

var	gulp				= require('gulp'),
    autoprefixer	    = require('gulp-autoprefixer'),
    cache			    = require('gulp-cache'),
    concat			    = require('gulp-concat'),
    livereload          = require('gulp-livereload'),
    imagemin		    = require('gulp-imagemin'),
    notify			    = require('gulp-notify'),
    rename			    = require('gulp-rename'),
    plumber			    = require('gulp-plumber'),
    sass			    = require('gulp-sass'),
    stripCssComments    = require('gulp-strip-css-comments'),
    uglify			    = require('gulp-uglify');

    // Change paths accordingly
    pathSource		= 'source',
	pathBuild		= 'public/assets'

// Compile and uglify styles
gulp.task('styles', function() {

	gulp.src([pathSource+'/sass/**/*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer('last 2 versions'))
        .pipe(stripCssComments({preserve:false})) /* Strip all comments */

		.pipe(rename("main.css"))

		.pipe(gulp.dest(pathBuild+'/css'))

        .pipe(notify("Sass compiled and uglified and comments stripped!"))

        .pipe(livereload());
});

// DEV ONLY: Compile styles
gulp.task('styles-dev', function() {

    gulp.src([pathSource+'/sass/**/*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename("main.css"))

        .pipe(gulp.dest(pathBuild+'/css'))

        .pipe(notify("DEV: Sass compiled!"))

        .pipe(livereload());
});

// Concatenate & uglify JS
gulp.task('scripts--async', function() {
    return gulp.src(pathSource+'/js/async/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        //.pipe(concat('main.min.js'))
        .pipe(concat('main-async.js'))
        .pipe(uglify())

        .pipe(gulp.dest(pathBuild+'/js'))

        .pipe(notify("JS Concatenated and uglified!"))

        .pipe(livereload());
});

// DEV ONLY: Concatenate non-uglified JS
gulp.task('scripts--async-dev', function() {
    return gulp.src(pathSource+'/js/async/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('main-async.js'))

        .pipe(gulp.dest(pathBuild+'/js'))

        .pipe(notify("DEV: JS ASync Concatenated!"))

        .pipe(livereload());
});

// Concatenate & uglify JS
gulp.task('scripts--main', function() {
    return gulp.src(pathSource+'/js/main/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        //.pipe(concat('main.min.js'))
        .pipe(concat('main.js'))
        .pipe(uglify())

        .pipe(gulp.dest(pathBuild+'/js'))

        .pipe(notify("JS Main Concatenated and uglified!"))

        .pipe(livereload());
});

// DEV ONLY: Concatenate non-uglified JS
gulp.task('scripts--main-dev', function() {
    return gulp.src(pathSource+'/js/main/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('main.js'))

        .pipe(gulp.dest(pathBuild+'/js'))

        .pipe(notify("DEV: JS Main Concatenated!"))

        .pipe(livereload());
});

// Uglify optional JS
gulp.task('scripts--optional', function() {
	return gulp.src(pathSource+'/js/optional/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(uglify())
        .pipe(gulp.dest(pathBuild+'/js'))

        .pipe(notify("Optional JS uglified!"))

        .pipe(livereload());
});

// DEV ONLY: Compile non-uglified optional JS
gulp.task('scripts--optional-dev', function() {
	return gulp.src(pathSource+'/js/optional/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))

        .pipe(gulp.dest(pathBuild+'/js'))

        .pipe(notify("DEV: Optional JS compiled!"))

        .pipe(livereload());
});

// Compress images
gulp.task('images', function() {
	gulp.src(pathSource+'/images/**')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))

		.pipe(gulp.dest(pathBuild+'/images/'))

        .pipe(livereload());
});

// Watch task
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([pathSource+'/sass/**/*.scss'], ['styles']);
    gulp.watch([pathSource+'/js/async/**/*.js'], ['scripts--async']);
	gulp.watch([pathSource+'/js/main/**/*.js'], ['scripts--main']);
	gulp.watch([pathSource+'/js/optional/**/*.js'], ['scripts--optional']);
	gulp.watch([pathSource+'/images/**'], ['images']);
});

// DEV ONLY: Watch task
gulp.task('watch--dev', function() {
    gulp.watch([pathSource+'/sass/**/*.scss'], ['styles-dev']);
    gulp.watch([pathSource+'/js/async/**/*.js'], ['scripts--async-dev']);
    gulp.watch([pathSource+'/js/main/**/*.js'], ['scripts--main-dev']);
    gulp.watch([pathSource+'/js/optional/**/*.js'], ['scripts--optional-dev']);
    gulp.watch([pathSource+'/images/**'], ['images']);
});

gulp.task('default', [
	'styles',
    'scripts--async',
	'scripts--main',
	'scripts--optional',
	'images',
	'watch'
	]);

gulp.task('dev', [
    'styles-dev',
    'scripts--async-dev',
    'scripts--main-dev',
    'scripts--optional-dev',
    'images',
    'watch--dev'
]);
