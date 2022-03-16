/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const { dest, series, src } = require("gulp");
const { join } = require("path");
const deleteFolder = require("../build-scripts/delete-folder");
const gulpEsbuild = require("gulp-esbuild");


/* -------------------------------------------------------------------------- */
/*                            Preparations & Utils                            */
/* -------------------------------------------------------------------------- */

/**
 * Paths in ./src folder
 */
const srcDir = {
    "basePath": "src",
    "indexScriptFilePath": "index.ts",
};

/**
 * Paths in ./dist folder
 */
const distDir = {
    "basePath": "dist"
};

/**
 * Build mode
 */
const mode = process.env.NODE_ENV || "dev";


/* -------------------------------------------------------------------------- */
/*                                    Tasks                                   */
/* -------------------------------------------------------------------------- */

const deleteTargetFolders = async () => {
    return deleteFolder(distDir.basePath);
}

deleteTargetFolders.displayName = "build:delete-target-folders";

/* --- */

const buildJS = async () => {
    return src( join(srcDir.basePath, srcDir.indexScriptFilePath) )
        .pipe(
            gulpEsbuild({
                bundle: true,
                minify: mode === "prod",
                outfile: srcDir.indexScriptFilePath.replace(".ts", ".js"),
                platform: "browser",
            })
        )
        .pipe(
            dest(distDir.basePath)
        );
}

buildJS.displayName = "build:js";

/* --- */

exports.build               = series(deleteTargetFolders, buildJS);
exports.buildJS             = buildJS;
exports.deleteTargetFolders = deleteTargetFolders;
