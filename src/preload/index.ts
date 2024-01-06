import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  writeToClipboard: async (content: string): Promise<void> =>
    ipcRenderer.send('write-to-clipboard', content),
  showNotifications: async (title: string, body: string): Promise<void> =>
    ipcRenderer.send('show-notification', title, body)
})
