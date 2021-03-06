import '/styles/tailwind.css'
import HMR from '@sveltech/routify/hmr'
import App from './App.svelte'

const app = HMR(App, { target: document.body }, 'routify-app')

export default app

if (location.hostname !== 'localhost' && 'serviceWorker' in navigator) {
  import('workbox-window').then(async ({ Workbox }) => {
    const wb = new Workbox('/sw.js')
    const registration = await wb.register()
    wb.addEventListener('installed', () => (console.log('installed service worker')))
    wb.addEventListener('externalinstalled', () => (console.log('installed service worker')))
  })
}
