const { app, BrowserWindow } = require('electron')
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')

// レンダープロセスとなるブラウザ・ウィンドウのオブジェクト。
// オブジェクトが破棄されると、プロセスも終了するので、グローバルオブジェクトとする。
let win
// let isDev = process.env['NODE_ENV'] === 'development'
console.log(process.env['NODE_ENV'])
let isDev = true

function createWindow() {
  // ブラウザウィンドウの作成
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  // index.html をロードする
  if (isDev) {
    win.webContents.openDevTools()
    // Load index.html via webpack dev server.
    require('./webpack-server.js')
    win.loadURL('http://localhost:3000/index.html')

    // Open the DevTools.
    win.webContents.openDevTools()
  } else {
    // Load index.html from the file system.
    win.loadFile('dist/index.html')
  }
  // win.loadFile('index.html')
  // // 起動オプションに、 "--debug"があれば開発者ツールを起動する
  // if (process.argv.find(arg => arg === '--debug')) {
  //   win.webContents.openDevTools()
  // }
  // ブラウザウィンドウを閉じたときのイベントハンドラ
  win.on('closed', () => {
    // 閉じたウィンドウオブジェクトにはアクセスできない
    win = null
  })
}

// このメソッドは、Electronが初期化を終了し、
// ブラウザウィンドウを作成する準備ができたら呼び出される。
// 一部のAPIは、このイベントが発生した後にのみ使用できる。
app.on('ready', () => {
  if (isDev) {
    ;[REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
      installExtension(extension)
        .then(name => console.log(`Added Extension: ${name}`))
        .catch(err => console.log('An error occurred: ', err))
    })
  }
  createWindow()
})

// 全てのウィンドウオブジェクトが閉じたときのイベントハンドラ
app.on('window-all-closed', () => {
  // macOSでは、アプリケーションとそのメニューバーがCmd + Qで
  // 明示的に終了するまでアクティブになるのが一般的なため、
  // メインプロセスは終了させない
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // MacOSでは、ドックアイコンがクリックされ、
  // 他のウィンドウが開いていないときに、アプリケーションでウィンドウを
  // 再作成するのが一般的です。
  if (win === null) {
    createWindow()
  }
})
