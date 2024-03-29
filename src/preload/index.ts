import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  writeToClipboard: async (content: string): Promise<void> => {
    ipcRenderer.send('write-to-clipboard', content)
  },
  showNotifications: async (title: string, body: string): Promise<void> => {
    ipcRenderer.send('show-notification', title, body)
  },
  generateInvitation: async (serverId: string, channels: string[]): Promise<void> => {
    ipcRenderer.send('generate-invitation', serverId, channels)
  }
})

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, ...args: any) => ipcRenderer.send(channel, ...args),
    on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener)
  }
})
