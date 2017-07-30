const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')



// MY SHIT
const Menu = electron.Menu

const fs = require('fs')
const os = require('os')
const ipc = electron.ipcMain
const shell = electron.shell

const storage = require('electron-json-storage')

app.getPath('userData')

ipc.on('test', function (event) {
    // Write
    console.log("caca")

    storage.set('foobar', { foo: 'bar' })

    // Read

    console.log(storage.get('foobar'))
    // will print "bar"
})


// end of my shit



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



//MORE OF MY shit
//
// ipcMain.on('submitForm', function(event, data) {
//     // Access form data here
// });


ipc.on('print-to-pdf', function (event) {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  win.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})

//
// let template = [{
//   label: 'print-to-pdf',
//   submenu: [{
//     label: 'print-to-pdf',
//     accelerator: 'CmdOrCtrl+P',
//     role: 'print-to-pdf'
//   }, {
//     label: 'Toggle Developer Tools',
//     accelerator: (function () {
//       if (process.platform === 'darwin') {
//         return 'Alt+Command+I'
//       } else {
//         return 'Ctrl+Shift+I'
//       }
//     })(),
//     click: function (item, focusedWindow) {
//       if (focusedWindow) {
//         focusedWindow.toggleDevTools()
//       }
//     }
//   }]}]
//
//   function addUpdateMenuItems (items, position) {
//   if (process.mas) return
//
//   const version = electron.app.getVersion()
//   let updateItems = [{
//     label: `Version ${version}`,
//     enabled: false
//   }, {
//     label: 'Checking for Update',
//     enabled: false,
//     key: 'checkingForUpdate'
//   }, {
//     label: 'Check for Update',
//     visible: false,
//     key: 'checkForUpdate',
//     click: function () {
//       require('electron').autoUpdater.checkForUpdates()
//     }
//   }, {
//     label: 'Restart and Install Update',
//     enabled: true,
//     visible: false,
//     key: 'restartToUpdate',
//     click: function () {
//       require('electron').autoUpdater.quitAndInstall()
//     }
//   }]
//
//   items.splice.apply(items, [position, 0].concat(updateItems))
// }
//
// function findReopenMenuItem () {
//   const menu = Menu.getApplicationMenu()
//   if (!menu) return
//
//   let reopenMenuItem
//   menu.items.forEach(function (item) {
//     if (item.submenu) {
//       item.submenu.items.forEach(function (item) {
//         if (item.key === 'reopenMenuItem') {
//           reopenMenuItem = item
//         }
//       })
//     }
//   })
//   return reopenMenuItem
// }
//
// if (process.platform === 'darwin') {
//   const name = electron.app.getName()
//   template.unshift({
//     label: name,
//     submenu: [{
//       label: `About ${name}`,
//       role: 'about'
//     }, {
//       type: 'separator'
//     }, {
//       label: 'Services',
//       role: 'services',
//       submenu: []
//     }, {
//       type: 'separator'
//     }, {
//       label: `Hide ${name}`,
//       accelerator: 'Command+H',
//       role: 'hide'
//     }, {
//       label: 'Hide Others',
//       accelerator: 'Command+Alt+H',
//       role: 'hideothers'
//     }, {
//       label: 'Show All',
//       role: 'unhide'
//     }, {
//       type: 'separator'
//     }, {
//       label: 'Quit',
//       accelerator: 'Command+Q',
//       click: function () {
//         app.quit()
//       }
//     }]
//   })
//
//   // Window menu.
//   template[3].submenu.push({
//     type: 'separator'
//   }, {
//     label: 'Bring All to Front',
//     role: 'front'
//   })
//
//   addUpdateMenuItems(template[0].submenu, 1)
// }
//
// if (process.platform === 'win32') {
//   const helpMenu = template[template.length - 1].submenu
//   addUpdateMenuItems(helpMenu, 0)
// }
//
// app.on('ready', function () {
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu)
// })
//
// app.on('browser-window-created', function () {
//   let reopenMenuItem = findReopenMenuItem()
//   if (reopenMenuItem) reopenMenuItem.enabled = false
// })
//
// app.on('window-all-closed', function () {
//   let reopenMenuItem = findReopenMenuItem()
//   if (reopenMenuItem) reopenMenuItem.enabled = true
// })
