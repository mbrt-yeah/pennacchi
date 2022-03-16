/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const { dest, series } = require("gulp");
const deleteFolder = require("../build-scripts/delete-folder");
const ts = require("gulp-typescript");


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


/* -------------------------------------------------------------------------- */
/*                                    Tasks                                   */
/* -------------------------------------------------------------------------- */

const deleteTargetFolders = async () => {
    return deleteFolder(distDir.basePath);
}

deleteTargetFolders.displayName = "build:delete-target-folders";

/* --- */

const buildJS = async () => {
    const tsProject = ts.createProject("tsconfig.json");
    const result = tsProject.src().pipe( tsProject() );
    return result.pipe(dest(distDir.basePath));
}

buildJS.displayName = "build:js";

/* --- */

exports.buildJS             = buildJS;
exports.deleteTargetFolders = deleteTargetFolders;

exports.build = series(
    deleteTargetFolders,
    buildJS,
);
