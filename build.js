const esbuild = require('esbuild')
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin')

const build = async () => {
  const isProd = process.env.NODE_ENV === 'production'

  const result = await esbuild.build({
    platform: 'browser',
    entryPoints: [`${__dirname}/src/index.js`],
    publicPath: '/',
    outdir: `${__dirname}/build`,
    legalComments: 'external',
    bundle: true,
    treeShaking: true,
    minify: isProd,
    write: true,
    format: 'esm',
    loader: {
      '.js': 'jsx',
      // '.jsx': 'jsx',
      // '.ts': 'ts',
      // '.tsx': 'ts',
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.svg': 'file',
      '.woff2': 'file',
      '.ttf': 'file'
    },
    target: 'es2018',
    plugins: [
      sassPlugin({
        outputStyle: isProd ? 'compressed' : 'expanded'
        // transform: postcssModules({
        //   // ...put here the options for postcss-modules: https://github.com/madyankin/postcss-modules
        // })
      })
    ]
  })
}

build()
