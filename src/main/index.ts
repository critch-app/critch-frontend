import { app, shell, BrowserWindow, screen, ipcMain, clipboard, Notification } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as jwt from 'jsonwebtoken'

let mainWindow: BrowserWindow
function createWindow(): BrowserWindow {
  // Create the browser window.
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
    // handle in windows & linux
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
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.critch')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
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
        // Someone tried to run a second instance, we should focus our window.
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
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here
ipcMain.on('write-to-clipboard', async (_, content: string) => {
  clipboard.writeText(content)
})

ipcMain.on('show-notification', async (_, title: string, body: string) => {
  new Notification({
    title: title,
    body: body,
    timeoutType: 'default'
  }).show()
})

// register an event to create an invitation link
ipcMain.on('generate-invitation', async (event, serverId: string, channels: string[]) => {
  try {
    const token = await jwt.sign({ serverId, channels }, 'my-secret-key', {
      algorithm: 'HS256',
      expiresIn: 30 * 24 * 60 * 60
    })
    event.sender.send('token-generated', `critch-invitation://critch?token=${token}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message)
    event.sender.send('token-error', error?.message)
  }
})
