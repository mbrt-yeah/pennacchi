const mode = process.env.NODE_ENV || "dev";

/**
 * Utility function to check if the build is performed in production mode
 * 
 * @returns boolean - true if build is performed in production mode and false if otherwise
 */
module.exports = () => mode === "prod";