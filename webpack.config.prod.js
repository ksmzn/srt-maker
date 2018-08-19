const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // node.js で動作することを指定する
  target: 'node',
  // 起点となるファイル
  entry: {
    app: ['./src/index.tsx']
  },
  // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
  // production は、コードの圧縮やモジュールの最適化が行われる設定となる
  mode: 'production', // "production" | "development" | "none"
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Copy necessary files that won't be in the .js bundle
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/index.html'),
        to: path.resolve(__dirname, 'dist/index.html')
      }
    ])
  ],
  // 出力先設定 __dirname は node でのカレントディレクトリのパスが格納される変数
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // ファイルタイプ毎の処理を記述する
  module: {
    rules: [
      {
        // 正規表現で指定する
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        // ローダーの指定
        // TypeScript をコンパイルする
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel']
            }
          },
          'ts-loader'
        ]
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 処理対象のファイルを記載する
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js' // node_modulesのライブラリ読み込みに必要
    ]
  }
}
