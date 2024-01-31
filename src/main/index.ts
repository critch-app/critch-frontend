import { app, shell, BrowserWindow, screen, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as jwt from 'jsonwebtoken'
import { copyToClipboard, generateInvitation, showNotification } from './handles'

let mainWindow: BrowserWindow
function createWindow(): BrowserWindow {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
    }
  })

  // register the URL Handler
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('critch-invitation', process.execPath, [
        path.resolve(process.argv[1])
      ])
    } else {
      app.setAsDefaultProtocolClient('critch-invitation')
    }
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.setTitle('Critch')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.critch')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const gotTheLock = app.requestSingleInstanceLock()
  mainWindow = createWindow()

  if (!gotTheLock) {
    app.quit()
  } else {
    if (process.platform !== 'darwin') {
      app.on('second-instance', (_event, commandLine) => {
        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore()
          mainWindow.focus()
        }
        const url = commandLine.pop()
        const token = url?.split('=')[1]
        const payload = jwt.verify(token, 'my-secret-key')
        mainWindow.webContents.send('add-me-to-server', payload.serverId, payload.channels)
      })
    } else {
      app.on('open-url', (_event, url) => {
        const token = url?.split('=')[1]
        const payload = jwt.verify(token, 'my-secret-key')
        mainWindow.webContents.send('add-me-to-server', payload.serverId, payload.channels)
      })
    }
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// register events
ipcMain.on('write-to-clipboard', copyToClipboard)
ipcMain.on('show-notification', showNotification)
ipcMain.on('generate-invitation', generateInvitation)
