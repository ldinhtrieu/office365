import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default (env = {} as any): Configuration => {
  const isDevMode = env.NODE_ENV === 'dev';
  const mode = isDevMode ? 'development' : 'production';
  const devtool = isDevMode ? 'inline-source-map' : false;
  return {
    entry: './src/server.ts',
    mode,
    devtool,
    context: path.resolve(__dirname, 'src'),
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts'],
    },
    externals: [nodeExternals()],
    output: {
      filename: '[name].bundle.js',
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      runtimeChunk: 'single',
    },
  };
};
