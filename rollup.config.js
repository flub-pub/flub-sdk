import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
    input: 'src/index.ts',
    output: {
        format: 'umd',
        file: 'build/index.js',
        name: 'FlubSDK',
        sourcemap: true
    },
    plugins: [
        commonjs(),
        terser(),
        nodeResolve({ browser: true }),
        typescript()
    ],
}
