const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const {
  uglify
} = require('rollup-plugin-uglify');

function inputOptions() {
  return {
    input: __dirname + '/src/index.ts',
    plugins: [
      typescript({
        tsconfig: "./memberModule/tsconfig.json",
      }),
      resolve(),
      buble(),
      commonjs()
    ]
  };
}


async function build(outputOptions) {
  let _inputOptions = inputOptions();
  if (outputOptions.format == 'umd') {

    _inputOptions.plugins.push(uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    }))
    // inputOptions.plugins.splice(0, inputOptions.plugins.length - 1);
    // console.log('inputOptions', inputOptions.plugins)
  }
  // create a bundle
  const bundle = await rollup.rollup(_inputOptions);

  // console.log(bundle.imports); // an array of external dependencies
  // console.log(bundle.exports); // an array of names exported by the entry point
  // console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap

  const {
    code,
    map
  } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}
console.log('会员模块--es打包');
build({
  file: __dirname + '/dist/index-es.js',
  format: 'es'
});

console.log('会员模块--umd打包');
build({
  file: __dirname + '/dist/index.js',
  name: 'memberModule',
  format: 'umd'
});