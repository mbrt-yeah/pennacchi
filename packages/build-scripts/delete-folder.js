const rimraf = require("rimraf");

module.exports = function(folderPath) {
    return new Promise((resolve, reject) => {
        rimraf(folderPath, (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
}
