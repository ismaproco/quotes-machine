var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');

gulp.task('copy', function() {
  return [ gulp.src('./index.html').
           pipe(gulp.dest('./public/')),

           gulp.src(['./templates/**/*.html']).
           pipe(gulp.dest('./public/templates/')),
      
           gulp.src('./js/**/*.js')
           .pipe( gulp.dest('./public/js/') )
         ];
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
         .pipe(less({
            paths:[ path.join(__dirname, 'less', 'includes') ]
         }))
         .pipe(gulp.dest('./public/css'));
});


gulp.task('default', function() {
    gulp.start('less', 'copy');
});
