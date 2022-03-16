const mode = process.env.NODE_ENV || "dev";

/**
 * Utility function to check if the build is performed in development mode
 * 
 * @returns boolean - true if build is performed in development mode and false if otherwise
 */
module.exports = () => mode === "dev";