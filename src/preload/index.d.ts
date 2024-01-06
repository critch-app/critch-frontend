import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  declare interface Window {
    electron: ElectronAPI
    api: {
      writeToClipboard: (content: string) => Promise<void>
      showNotifications: (title: string, body: string) => Promise<void>
    }
  }
}
