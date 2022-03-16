const { join, parse } = require("path");
const awaitTo = require("await-to-js").default;
const commonjs = require("@rollup/plugin-commonjs");
const isDevMode = require("./is-dev-mode");
const isProdMode = require("./is-prod-mode");
const nodePolyfills = require("rollup-plugin-polyfill-node");
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const rollup = require("rollup").rollup;
const svelte = require("rollup-plugin-svelte");
const sveltePreprocess = require("svelte-preprocess");
const terser = require("rollup-plugin-terser");
const ts = require("@rollup/plugin-typescript");

module.exports = async function({from, to, include, tsconfig, moduleFormat}) {
    const toParsed = parse(to);

    const rollupOptions = { 
        input: from,
        plugins: [
            svelte({
                preprocess: sveltePreprocess(),
                compilerOptions: {
                    dev: isDevMode() // enable run-time checks when not in production
                }
            }),
            nodeResolve({
                browser: true,
                dedupe: ["svelte"]
            }),
            nodePolyfills(),
            commonjs({
                include: include || [],
                ignoreGlobal: true,
            }),
            ts({ tsconfig }),
            isProdMode() && terser()
        ],
        external: []
    };

    const [error, bundle] = await awaitTo( rollup(rollupOptions) );

    if (error) {
        throw error;
    }

    return bundle.write({
        file: to,
        format: moduleFormat,
        name: toParsed.name.replace(/-/gm,"").toLowerCase(),
        sourcemap: true
    });
}
