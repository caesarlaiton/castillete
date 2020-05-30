const gulp = require("gulp"),
	log = require("fancy-log"),
	critical = require("critical").stream,
	htmlmin = require("gulp-htmlmin");

gulp.task("critical", () => {
  return gulp
    .src("public/**/*.html")
    .pipe(critical({
      base: "/",
      inline: true,
      css: [
        "public/css/style.css"
      ]
    }))
    .on("error", err => {
      log.error(err.message);
    })
    .pipe(gulp.dest("public"));
});

gulp.task("minify", () => {
  return gulp.src("public/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public"));
});
