const { dest, src } = require("gulp");

module.exports = function({from, fromOptions, to}) {
    return src(from, fromOptions).pipe(dest(to));
}
