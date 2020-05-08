//babel
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
//压缩代码
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/Validate.js',
  output:  [
    {
      file: 'dist/Validate.js',
      name: 'Validate',
      format: 'umd'
    },
    {
      file: 'dist/Validate.min.js',
      format: 'umd',
      name: 'Validate',
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};