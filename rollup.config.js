import react from 'react';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss-modules';
import commonjs from 'rollup-plugin-commonjs';
import reactDom from 'react-dom';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
      writeDefinitions: true,
    }),
    typescript({
      typescript: require('typescript'),
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
      },
    }),
    json(),
  ],
};
